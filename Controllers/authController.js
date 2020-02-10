const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../Models/user");
const RefreshToken = require("../Models/refreshToken");
const keys = require("../Config/keys");
const errorHandler = require("../Utils/errorHandler");
const transporter = require("../Utils/transporter");

exports.loginUser = async function(req, res) {
  const candidate = await User.findOne({
    email: req.body.email
  });

  if (candidate) {
    if (candidate.confirmEmail) {
      const passwordResult = bcrypt.compareSync(
        req.body.password,
        candidate.password
      );
      if (passwordResult) {
        const accessToken = jwt.sign(
          {
            email: candidate.email,
            userId: candidate._id,
            userName: candidate.userName,
            userRole: candidate.userRole
          },
          keys.jwt,
          { expiresIn: 3600 }
        );

        const refreshToken = jwt.sign(
          {
            userId: candidate._id
          },
          keys.jwtRefresh,
          { expiresIn: 7776000 }
        );

        // const newRefreshToken = new RefreshToken({
        //   token: refreshToken
        // });
        // try {
        //   await newRefreshToken.save();
        // } catch (e) {
        //   console.error(e);
        // }

        res.status(200).json({
          accessToken: `Bearer ${accessToken}`,
          refreshToken: `${req.body.rememberMe ? refreshToken : "no_remember"}`
        });
      } else {
        res.status(401).json({
          message: "Неверный пароль."
        });
      }
    } else {
      res.status(409).json({
        message: "Подтвердите email."
      });
    }
  } else {
    res.status(404).json({
      message: "Пользователь с таким email не найден."
    });
  }
};

exports.registerUser = async function(req, res) {
  if (await User.findOne({ email: req.body.email })) {
    res.status(409).json({
      message: "Аккаунт с таким email существует."
    });
  } else if (await User.findOne({ userName: req.body.userName })) {
    res.status(409).json({
      message: "Имя пользователя уже используется."
    });
  } else {
    const salt = bcrypt.genSaltSync(10);
    const password = req.body.password;
    const user = new User({
      email: req.body.email,
      userName: req.body.userName,
      userRole: "user",
      confirmEmail: false,
      password: bcrypt.hashSync(password, salt)
    });

    try {
      await user.save(err => {});
      await jwt.sign(
        {
          email: req.body.email
        },
        keys.emailSecret,
        { expiresIn: "1d" },
        (err, emailToken) => {
          if (err) return console.log(err);
          const url = `http://192.168.0.101:5000/auth/confirm/${emailToken}`;

          transporter.sendMail({
            from: "Кинотеатр имени Маяковского",
            to: req.body.email,
            subject: "Пожалуйста, подтвердите свой email.",
            html: `Для подтверждения аккаунта перейдите по ссылке: <a href="${url}">${url}</a>`
          });
        }
      );
      res.status(201).json({
        message: "Пожалуйста, подтвердите email. Письмо выслано"
      });
    } catch (e) {
      errorHandler(res, e);
    }
  }
};

exports.confirmEmail = async function(req, res) {
  try {
    const emailToken = jwt.verify(req.params.token, keys.emailSecret);
    await User.findOneAndUpdate(
      { email: emailToken.email },
      { confirmEmail: true }
    );
  } catch (e) {
    errorHandler(res, e);
  }

  return res.redirect("http://localhost:3000/auth/login");
};

exports.refreshToken = async function(req, res) {
  try {
    const tokenFromReq = req.body.refresh;
    //const candidateToken = await RefreshToken.findOne({ token: tokenFromReq });
    if (tokenFromReq) {
      const decode = await jwt.verify(tokenFromReq, keys.jwtRefresh);
      console.log(decode);

      const user = await User.findById(decode.userId);
      if (decode && Math.trunc(Date.now() / 1000) < decode.exp) {
        const accessToken = jwt.sign(
          {
            email: user.email,
            userId: user._id,
            userName: user.userName,
            userRole: user.userRole
          },
          keys.jwt,
          { expiresIn: 3600 }
        );
        const refreshToken = jwt.sign(
          {
            userId: user._id
          },
          keys.jwtRefresh,
          { expiresIn: 7776000 }
        );
        res.status(200).json({
          accessToken: `Bearer ${accessToken}`,
          refreshToken
        });

        // await RefreshToken.findByIdAndUpdate(candidateToken._id, {
        //   token: refreshToken
        // });
      } else if (decode && Math.trunc(Date.now() / 1000) >= decode.exp) {
        res.status(401).json({
          message: "Срок жизни токена закончился. Авторизируйтесь заново"
        });
      }
    } else {
      res.status(500).json({
        message: "Token not found"
      });
    }
  } catch (e) {
    console.log(e);
  }
};
