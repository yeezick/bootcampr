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
exports.__esModule = true;
exports.RegisterUserInfo = void 0;
var react_router_dom_1 = require("react-router-dom");
var hooks_1 = require("../../utilities/redux/hooks");
var userSlice_1 = require("../../utilities/redux/slices/users/userSlice");
var react_1 = require("react");
var userConstants_1 = require("../../utilities/data/userConstants");
require("./RegisterUserInfo.scss");
exports.RegisterUserInfo = function () {
    var navigate = react_router_dom_1.useNavigate();
    var dispatch = hooks_1.useAppDispatch();
    var status = hooks_1.useAppSelector(userSlice_1.uiStatus);
    var authUser = hooks_1.useAppSelector(userSlice_1.selectAuthUser);
    var _a = react_1.useState(userConstants_1.emptyUser), userForm = _a[0], setUserForm = _a[1];
    var bio = userForm.bio, firstName = userForm.firstName, lastName = userForm.lastName, linkedinUrl = userForm.linkedinUrl, portfolioUrl = userForm.portfolioUrl, profilePicture = userForm.profilePicture, role = userForm.role;
    react_1.useEffect(function () {
        if (authUser.role) {
            navigate("/users/" + authUser._id + "/edit");
        }
        if (authUser) {
            setUserForm(function (currForm) {
                return __assign(__assign({}, currForm), authUser);
            });
        }
    }, [authUser]);
    react_1.useEffect(function () {
        if (status.isSuccess) {
            dispatch(userSlice_1.reset());
            navigate("/users/" + authUser._id);
        }
    }, [status.isSuccess, dispatch]);
    var handleChange = function (e) {
        var _a;
        var _b = e.target, name = _b.name, value = _b.value;
        setUserForm(__assign(__assign({}, userForm), (_a = {}, _a[name] = value, _a)));
    };
    var handleSubmit = function (e) {
        e.preventDefault();
        dispatch(userSlice_1.updateProfile(userForm));
    };
    return (React.createElement("div", { className: "acct-setup-page" },
        React.createElement("h1", null,
            "Hi, ",
            firstName,
            "!"),
        React.createElement("div", { className: "form-container" },
            React.createElement("section", { className: "profile-photo-grid" },
                React.createElement("div", { className: "profile-photo" },
                    React.createElement("img", { src: !profilePicture
                            ? 'https://pbs.twimg.com/profile_images/1564398871996174336/M-hffw5a_400x400.jpg'
                            : profilePicture, alt: "photo" })),
                React.createElement("label", null, "Profile Photo:"),
                React.createElement("input", { onChange: handleChange, type: "text", name: "profilePicture", placeholder: "Profile Photo", value: profilePicture })),
            React.createElement("div", { className: "user-info-grid" },
                React.createElement("h2", null, "Set Up Your Profile"),
                React.createElement("form", { onSubmit: handleSubmit },
                    React.createElement("div", { className: "form-input" },
                        React.createElement("label", null, "First Name:"),
                        React.createElement("input", { onChange: handleChange, type: "text", name: "firstName", placeholder: "First Name", value: firstName })),
                    React.createElement("div", { className: "form-input" },
                        React.createElement("label", null, "Last Name:"),
                        React.createElement("input", { onChange: handleChange, type: "text", name: "lastName", placeholder: "Last Name", value: lastName })),
                    React.createElement("div", { className: "form-input" },
                        React.createElement("label", null, "About Me:"),
                        React.createElement("input", { onChange: handleChange, type: "text", name: "bio", placeholder: "About Me", value: bio })),
                    React.createElement("div", { className: "form-input" },
                        React.createElement("label", null, "My Role:"),
                        React.createElement("input", { onChange: handleChange, type: "text", name: "role", placeholder: "My Role", value: role, required: true })),
                    React.createElement("h2", null, "Socials:"),
                    React.createElement("div", { className: "form-input" },
                        React.createElement("label", null, "LinkedIn URL:"),
                        React.createElement("input", { onChange: handleChange, type: "text", name: "linkedinUrl", placeholder: "LinkedIn URL", value: linkedinUrl })),
                    React.createElement("div", { className: "form-input" },
                        React.createElement("label", null, "Portfolio URL:"),
                        React.createElement("input", { onChange: handleChange, type: "text", name: "portfolioUrl", placeholder: "Portfolio URL", value: portfolioUrl })),
                    React.createElement("div", { className: "form-btn" },
                        React.createElement("button", { type: "submit" }, "Submit Profile")))))));
};
