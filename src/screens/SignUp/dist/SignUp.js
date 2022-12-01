"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.SignUp = void 0;
var userSlice_1 = require("../../utilities/redux/slices/users/userSlice");
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var hooks_1 = require("../../utilities/redux/hooks");
var bs_1 = require("react-icons/bs");
require("./SignUp.scss");
var userConstants_1 = require("../../utilities/data/userConstants");
exports.SignUp = function () {
    var navigate = react_router_dom_1.useNavigate();
    var dispatch = hooks_1.useAppDispatch();
    var status = hooks_1.useAppSelector(userSlice_1.uiStatus);
    var userId = hooks_1.useAppSelector(userSlice_1.selectAuthUser)._id;
    var _a = react_1.useState('password'), inputType = _a[0], setInputType = _a[1];
    var _b = react_1.useState(null), passwordsMatch = _b[0], togglePasswordsMatch = _b[1];
    var _c = react_1.useState(userConstants_1.emptySignUp), formValues = _c[0], setFormValues = _c[1];
    var confirmPassword = formValues.confirmPassword, email = formValues.email, firstName = formValues.firstName, lastName = formValues.lastName, password = formValues.password;
    react_1.useEffect(function () {
        if (status.isSuccess) {
            dispatch(userSlice_1.reset());
            setFormValues(userConstants_1.emptySignUp);
            navigate("/users/" + userId + "/account-setup");
            togglePasswordsMatch(null);
        }
    }, [status.isSuccess, dispatch]);
    react_1.useEffect(function () {
        if (password.length === 0 || confirmPassword.length === 0) {
            togglePasswordsMatch(null);
        }
        else if (password !== confirmPassword) {
            togglePasswordsMatch(false);
        }
        else {
            togglePasswordsMatch(true);
        }
    }, [password, confirmPassword]);
    var handleChange = function (e) {
        var _a;
        var _b = e.target, name = _b.name, value = _b.value;
        setFormValues(__assign(__assign({}, formValues), (_a = {}, _a[name] = value, _a)));
    };
    var handleSubmit = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            e.preventDefault();
            dispatch(userSlice_1.register(formValues));
            return [2 /*return*/];
        });
    }); };
    var validateForm = function () {
        if (!passwordsMatch)
            return true;
        for (var _i = 0, _a = Object.values(formValues); _i < _a.length; _i++) {
            var value = _a[_i];
            if (!value)
                return true;
        }
    };
    var PasswordMatchStatus = function () {
        switch (passwordsMatch) {
            case true:
                return react_1["default"].createElement("h4", { className: "pwd-match" }, "Passwords match!");
            case false:
                return react_1["default"].createElement("h4", { className: "pwd-mismatch" }, "Passwords do not match");
            default:
                return null;
        }
    };
    var passwordReveal = function () {
        inputType === 'password' ? setInputType('text') : setInputType('password');
    };
    return (react_1["default"].createElement("div", { className: "signup-container" },
        react_1["default"].createElement("h3", null, "User Register"),
        react_1["default"].createElement("form", { onSubmit: handleSubmit, autoComplete: "off" },
            react_1["default"].createElement("div", { className: "form-input" },
                react_1["default"].createElement("label", null, "First Name"),
                react_1["default"].createElement("input", { type: "text", name: "firstName", placeholder: "First Name", onChange: handleChange, value: firstName, autoComplete: "off", required: true })),
            react_1["default"].createElement("div", { className: "form-input" },
                react_1["default"].createElement("label", null, "Last Name"),
                react_1["default"].createElement("input", { type: "text", name: "lastName", placeholder: "Last Name", onChange: handleChange, value: lastName, autoComplete: "off", required: true })),
            react_1["default"].createElement("div", { className: "form-input" },
                react_1["default"].createElement("label", null, "Email"),
                react_1["default"].createElement("input", { type: "email", name: "email", placeholder: "Email", onChange: handleChange, value: email, autoComplete: "off", required: true })),
            react_1["default"].createElement("div", { className: "pwd-input" },
                react_1["default"].createElement("div", null,
                    react_1["default"].createElement("label", null, "Password"),
                    inputType === 'password' ? (react_1["default"].createElement(bs_1.BsEyeSlash, { onClick: passwordReveal, className: "pwd-reveal-gray" })) : (react_1["default"].createElement(bs_1.BsEyeFill, { onClick: passwordReveal, className: "pwd-reveal" })),
                    react_1["default"].createElement("input", { type: inputType, name: "password", placeholder: "Password", onChange: handleChange, value: password, autoComplete: "off" }))),
            react_1["default"].createElement("div", { className: "form-input" },
                react_1["default"].createElement("label", null, "Confirm Password"),
                react_1["default"].createElement("input", { type: inputType, name: "confirmPassword", placeholder: "Confirm Password", onChange: handleChange, value: confirmPassword, autoComplete: "off" })),
            react_1["default"].createElement("div", { className: "form-btn" },
                react_1["default"].createElement("button", { type: "submit", disabled: validateForm() }, "Create Account"))),
        react_1["default"].createElement(PasswordMatchStatus, null)));
};
