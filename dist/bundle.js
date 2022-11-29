/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n(__webpack_require__(/*! dotenv */ \"dotenv\").config)();\n\nconst app = express__WEBPACK_IMPORTED_MODULE_0___default()();\nconst routes = __webpack_require__(/*! ./routes */ \"./src/routes/index.js\");\nconst mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\nconst helmet = __webpack_require__(/*! helmet */ \"helmet\");\nconst cors = __webpack_require__(/*! cors */ \"cors\");\napp.use(express__WEBPACK_IMPORTED_MODULE_0___default().json());\napp.use(express__WEBPACK_IMPORTED_MODULE_0___default().urlencoded({\n  extended: false\n}));\napp.use(helmet());\napp.use(cors());\napp.use(\"/api\", routes);\napp.use(function (err, req, res, next) {\n  console.error(err);\n  res.status(500).send(err);\n});\nlet PORT = process.env.PORT || 3000;\napp.listen(PORT, async error => {\n  if (error) {\n    console.error(error);\n    return;\n  }\n  try {\n    if (true) {\n      await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.hb1s7ws.mongodb.net/?retryWrites=true&w=majority`, {\n        useNewUrlParser: true,\n        useUnifiedTopology: true\n      });\n      mongoose.set(\"debug\", true);\n      console.log(`Server in running at PORT ${PORT}`);\n    }\n  } catch (error) {\n    console.error(error);\n  }\n});\n\n//# sourceURL=webpack://testbackend/./src/app.js?");

/***/ }),

/***/ "./src/middleware/auth.js":
/*!********************************!*\
  !*** ./src/middleware/auth.js ***!
  \********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const jwt = __webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\");\n//const {makeObjError} = require('./errorHandler')\n\nconst verifytoken = (req, res, next) => {\n  const bearerHeader = req.header(\"Authorization\");\n  if (bearerHeader) {\n    jwt.verify(bearerHeader, process.env.SECRET_KEY, (error, tokenInfo) => {\n      if (error) {\n        res.status(403).json(\"ERROR\", error);\n        return;\n      } else {\n        req.user = tokenInfo.user;\n      }\n      next();\n    });\n  } else {\n    res.status(403).json({\n      message: \"Acceso prohibido\"\n    });\n  }\n};\nmodule.exports = verifytoken;\n\n//# sourceURL=webpack://testbackend/./src/middleware/auth.js?");

/***/ }),

/***/ "./src/model/User.js":
/*!***************************!*\
  !*** ./src/model/User.js ***!
  \***************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\nconst User = mongoose.model(\"user\", {\n  name: String,\n  last_name: String,\n  email: String,\n  password: String\n});\nconst uservalidationSchema = {\n  id: \"/User\",\n  type: \"object\",\n  properties: {\n    name: {\n      type: \"string\",\n      minLength: 1\n    },\n    last_name: {\n      type: \"string\",\n      minLength: 1\n    },\n    email: {\n      type: \"string\",\n      minLength: 1\n    },\n    password: {\n      type: \"string\",\n      minLength: 1\n    }\n  },\n  required: [\"name\", \"last_name\", \"email\", \"password\"]\n};\nmodule.exports = {\n  User,\n  uservalidationSchema\n};\n\n//# sourceURL=webpack://testbackend/./src/model/User.js?");

/***/ }),

/***/ "./src/model/index.js":
/*!****************************!*\
  !*** ./src/model/index.js ***!
  \****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const {\n  User\n} = __webpack_require__(/*! ./User */ \"./src/model/User.js\");\nmodule.exports = {\n  User\n};\n\n//# sourceURL=webpack://testbackend/./src/model/index.js?");

/***/ }),

/***/ "./src/repository/user.repository.js":
/*!*******************************************!*\
  !*** ./src/repository/user.repository.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const {\n  User\n} = __webpack_require__(/*! ../model */ \"./src/model/index.js\");\nconst bcryptjs = __webpack_require__(/*! bcryptjs */ \"bcryptjs\");\nconst getUsers = async () => {\n  const users = await User.find().exec();\n  return users;\n};\nconst createUser = async user => {\n  user.password = await bcryptjs.hash(user.password, 8);\n  let dataBaseUser = new User(user);\n  await dataBaseUser.save();\n  return dataBaseUser;\n};\nconst updateUser = async (id, user) => {\n  const userId = await User.findByIdAndUpdate(id, user).exec();\n  return userId;\n};\nconst deletedUser = async id => {\n  const userId = await User.findByIdAndDelete(id).exec();\n  return userId;\n};\nconst getUserByEmail = async email => {\n  const user = await User.findOne({\n    email: email\n  }).exec();\n  return user;\n};\nmodule.exports = {\n  getUsers,\n  createUser,\n  updateUser,\n  deletedUser,\n  getUserByEmail\n};\n\n//# sourceURL=webpack://testbackend/./src/repository/user.repository.js?");

/***/ }),

/***/ "./src/routes/index.js":
/*!*****************************!*\
  !*** ./src/routes/index.js ***!
  \*****************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* module decorator */ module = __webpack_require__.hmd(module);\n\nconst router = express__WEBPACK_IMPORTED_MODULE_0___default().Router();\nconst users = __webpack_require__(/*! ./user.routes */ \"./src/routes/user.routes.js\");\nrouter.use(\"/users\", users);\nmodule.exports = router;\n\n//# sourceURL=webpack://testbackend/./src/routes/index.js?");

/***/ }),

/***/ "./src/routes/user.routes.js":
/*!***********************************!*\
  !*** ./src/routes/user.routes.js ***!
  \***********************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* module decorator */ module = __webpack_require__.hmd(module);\n\nconst router = express__WEBPACK_IMPORTED_MODULE_0___default().Router();\nconst userServices = __webpack_require__(/*! ../service/userServices.js */ \"./src/service/userServices.js\");\nconst jwt = __webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\");\nconst Validator = (__webpack_require__(/*! jsonschema */ \"jsonschema\").Validator);\nconst {\n  uservalidationSchema\n} = __webpack_require__(/*! ../model/User */ \"./src/model/User.js\");\nconst v = new Validator();\nconst verifytoken = __webpack_require__(/*! ../middleware/auth */ \"./src/middleware/auth.js\");\nrouter.get(\"/\", async (req, res) => {\n  try {\n    let results = await userServices.getRegisteredUser();\n    res.status(200).json(results);\n  } catch (error) {\n    res.status(400).json(\"Users not found\");\n  }\n});\nrouter.post(\"/register\", async (req, res) => {\n  try {\n    let user = req.body;\n    const validate = v.validate(user, uservalidationSchema);\n    if (!validate.valid) {\n      res.status(400).json(\"Error\", validate.toString());\n      return;\n    }\n    let createUser = await userServices.getCreateUser(user);\n    res.status(201).json(createUser);\n  } catch (error) {\n    res.status(400).json(\"Users not created\");\n  }\n});\nrouter.post(\"/login\", async (req, res) => {\n  try {\n    const reqUser = req.body;\n    //console.log(\"EMAIL USER \", reqUser.email);\n    let userFind = await userServices.findUserByEmail(reqUser.email);\n    //console.log(\"USERFIND \");\n    if (!userFind) {\n      console.log(\"ERROR \");\n      res.status(404).json(\"error en if\");\n    }\n    //console.log(\"usertojken \");\n    const userToken = {\n      user: userFind.email,\n      id: userFind.id\n    };\n    //console.log(\"USERTOKEN \", userToken);\n    let token = await userServices.generateToken(userFind.password, reqUser.password, userToken);\n    //console.log(\"TOKEN \", token);\n    res.status(200).json({\n      token: token\n    });\n  } catch (error) {\n    //console.log(\"ERROR CATCH\", error);\n    res.status(400).json(\"Error\", error);\n  }\n});\nrouter.put(\"/:id\", async (req, res) => {\n  try {\n    let user = req.body;\n    let id = req.params.id;\n    let updateUser = await userServices.getUpdateUser(id, user);\n    res.status(200).json(updateUser);\n  } catch (error) {\n    res.status(400).json(\"Users not created\");\n  }\n});\nrouter.delete(\"/:id\", async (req, res) => {\n  try {\n    const id = req.params.id;\n    const deleteUser = await userServices.getDeletedUser(id);\n    res.status(200).json(deleteUser);\n  } catch (error) {\n    res.status(400).json(\"Users not deleted\");\n  }\n});\nrouter.get(\"/profile-user\", verifytoken, async (req, res) => {\n  try {\n    res.status(200).json(\"User profile section\");\n  } catch (err) {\n    res.status(400).json(\"Acceso prohibido\");\n  }\n});\nmodule.exports = router;\n\n//# sourceURL=webpack://testbackend/./src/routes/user.routes.js?");

/***/ }),

/***/ "./src/service/userServices.js":
/*!*************************************!*\
  !*** ./src/service/userServices.js ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const bcryptjs = __webpack_require__(/*! bcryptjs */ \"bcryptjs\");\nconst jwt = __webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\");\nconst {\n  getUsers,\n  createUser,\n  updateUser,\n  deletedUser,\n  getUserByEmail\n} = __webpack_require__(/*! ../repository/user.repository */ \"./src/repository/user.repository.js\");\nconst getRegisteredUser = async () => {\n  return await getUsers();\n};\nconst getCreateUser = async user => {\n  return await createUser(user);\n};\nconst getUpdateUser = async (id, user) => {\n  return await updateUser(id, user);\n};\nconst getDeletedUser = async id => {\n  return await deletedUser(id);\n};\nconst findUserByEmail = async email => {\n  const userEmail = await getUserByEmail(email);\n  return userEmail;\n};\nconst generateToken = async (hashPassword, comparePassword, userData) => {\n  return new Promise((res, rej) => {\n    //console.log(\"HASHpaswprd \", hashPassword);\n    //console.log(\"comparePassword \", comparePassword);\n    //console.log(\"userData \", userData);\n    if (bcryptjs.compareSync(comparePassword, hashPassword)) {\n      //console.log(\"SIGN\");\n      jwt.sign({\n        user: userData\n      }, process.env.SECRET_KEY, {\n        expiresIn: \"24h\"\n      }, (err, token) => {\n        //console.log(\"ERROR \", err);\n        if (err) {\n          rej(\"PASSWORD O USUARIO INVALIDO\");\n        }\n        //console.log(\"RES OK \", token);\n        res(token);\n      });\n    } else {\n      rej(\"PASSWORD O USUARIO INVALIDO\");\n    }\n  });\n};\nmodule.exports = {\n  getRegisteredUser,\n  getCreateUser,\n  getUpdateUser,\n  getDeletedUser,\n  findUserByEmail,\n  generateToken\n};\n\n//# sourceURL=webpack://testbackend/./src/service/userServices.js?");

/***/ }),

/***/ "bcryptjs":
/*!***************************!*\
  !*** external "bcryptjs" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = require("bcryptjs");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("cors");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("dotenv");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("express");

/***/ }),

/***/ "helmet":
/*!*************************!*\
  !*** external "helmet" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("helmet");

/***/ }),

/***/ "jsonschema":
/*!*****************************!*\
  !*** external "jsonschema" ***!
  \*****************************/
/***/ ((module) => {

"use strict";
module.exports = require("jsonschema");

/***/ }),

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/***/ ((module) => {

"use strict";
module.exports = require("jsonwebtoken");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = require("mongoose");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/harmony module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.hmd = (module) => {
/******/ 			module = Object.create(module);
/******/ 			if (!module.children) module.children = [];
/******/ 			Object.defineProperty(module, 'exports', {
/******/ 				enumerable: true,
/******/ 				set: () => {
/******/ 					throw new Error('ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: ' + module.id);
/******/ 				}
/******/ 			});
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/app.js");
/******/ 	
/******/ })()
;