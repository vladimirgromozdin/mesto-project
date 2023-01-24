(()=>{"use strict";function e(e,t){e.disabled=!0,e.classList.add(t.inactiveButtonClass)}function t(t,n,o){!function(e){return e.some((function(e){return!e.validity.valid}))}(t)?(n.disabled=!1,n.classList.remove(o.inactiveButtonClass)):e(n,o)}var n=document.querySelector(".popup_content_remove-card-confirmation"),o=document.querySelector(".profile__avatar-wrapper"),r=document.querySelector(".profile__edit-icon");function c(e,t){e.classList.add("popup_opened"),document.addEventListener("keydown",ue),n.className.includes("popup_opened")&&function(e){n.dataset.id=e}(t)}function u(e){e.classList.remove("popup_opened"),document.removeEventListener("keydown",ue)}function a(e,t,n){e?document.querySelector(".popup_opened").querySelector(".popup__submit-button").textContent="Сохранение...":t.querySelector(".popup__submit-button").textContent=n}o.addEventListener("mouseover",(function(){r.classList.add("profile__edit-icon_display_active")})),o.addEventListener("mouseout",(function(){r.classList.remove("profile__edit-icon_display_active")}));var i=document.querySelector(".elements__wrapper"),l=document.querySelector(".popup__form_card"),s=document.querySelector(".profile__add-new-button"),d=document.querySelector(".popup_content_new-card"),p=document.querySelector(".popup__close-button_content_new-card"),m=document.querySelector("#new-card-template").content,f=document.querySelector(".popup_content_remove-card-confirmation"),_=document.querySelector("#place-image-link-input"),y=document.querySelector("#place-name-input");function v(e,t,n,o,r,u){var a=function(e,t,n,o){var r=m.cloneNode(!0),u=r.querySelector(".element"),a=r.querySelector(".element__caption"),i=r.querySelector(".element__image"),l=r.querySelector(".element__like-button"),s=r.querySelector(".element__trash-bin-button"),d=r.querySelector(".element__like-counter");return u.dataset.cardId=o,i.src=e,i.alt=t,a.textContent=t,d.textContent=n,i.addEventListener("click",re),l.addEventListener("click",(function(e){e.target.classList.contains("element__like-button_active")?function(e,t){fetch("".concat(h.baseUrl,"/cards/likes/").concat(t),{method:"DELETE",headers:h.headers}).then((function(e){return e.ok?e.json():Promise.reject("Пока снимали лайкк карточке ".concat(t," сервер вернул ошибку: ").concat(e.status))})).then((function(t){e.target.classList.remove("element__like-button_active"),S(e,t.likes.length)})).catch((function(e){console.log(e)}))}(e,o):function(e,t){fetch("".concat(h.baseUrl,"/cards/likes/").concat(t),{method:"PUT",headers:h.headers}).then((function(e){return e.ok?e.json():Promise.reject("При отправке лайка карточке ".concat(t,": ").concat(e.status))})).then((function(t){e.target.classList.add("element__like-button_active"),S(e,t.likes.length)})).catch((function(e){console.log(e)}))}(e,o)})),s.addEventListener("click",(function(){c(f,o)})),r}(t,n,o,r);i.prepend(a),u&&function(e){document.querySelector('[data-card-id="'.concat(e,'"]')).querySelector(".element__like-button").classList.toggle("element__like-button_active")}(r),e&&function(e){document.querySelector('[data-card-id="'.concat(e,'"]')).querySelector(".element__trash-bin-button").style.display="block"}(r)}function S(e,t){e.target.closest(".element__like-wrapper").querySelector(".element__like-counter").textContent=t}l.addEventListener("submit",(function(e,t){e.preventDefault(),a(!0),T(y.value,_.value,event)})),s.addEventListener("click",(function(){c(d)})),p.addEventListener("click",(function(){u(d)}));var h={baseUrl:"https://nomoreparties.co/v1/plus-cohort-18",headers:{authorization:"f14db4e9-636d-4f4a-a139-30505d4235b0","Content-Type":"application/json"}},q=document.querySelector(".profile__username"),b=document.querySelector(".profile__status"),k=document.querySelector(".popup_content_remove-card-confirmation"),g=document.querySelector(".popup_content_new-card"),L=document.querySelector(".popup_content_update-profile-image"),E=document.querySelector(".profile__avatar"),C=document.querySelector("#avatar-image-link-input"),j=document.querySelector(".popup_content_profile"),w=document.querySelector("#username-input"),x=document.querySelector("#status-input"),A=(document.querySelector("#place-image-link-input"),document.querySelector("#place-name-input"),"Сохранить"),P=document.forms.profileForm,U=document.forms.newAvatarLink,O=document.forms.cardData;function T(t,n,o){return fetch("".concat(h.baseUrl,"/cards"),{method:"POST",headers:h.headers,body:JSON.stringify({name:t,link:n})}).then((function(e){return e.ok?e.json():Promise.reject("При отправке новой карточки сервер вернул: ".concat(e.status))})).then((function(t){t.link,t.name,v(!0,t.link,t.name,t.likes.length,t._id),e(o.submitter,{inactiveButtonClass:"popup__submit-button_inactive"}),o.target.reset(),u(g)})).catch((function(e){console.log(e)})).finally((function(){a(!1,O,"Создать")}))}var D=document.querySelectorAll(".popup"),B=document.querySelector(".popup__close-button_content_fullimage"),N=document.querySelector(".popup_content_fullimage"),I=document.querySelector(".profile__username"),M=document.querySelector(".profile__status"),J=document.querySelector(".profile__editname-button"),F=document.querySelector(".popup_content_profile"),H=document.querySelector(".popup__close-button_content_profile"),V=document.querySelector(".popup__container_modal_confirmation"),z=document.querySelector(".popup_content_remove-card-confirmation"),$=V.querySelector(".popup__close-button"),G=document.querySelector(".popup__confirmation-button"),K=document.querySelector("#username-input"),Q=document.querySelector("#status-input"),R=document.querySelector(".profile__avatar-wrapper"),W=document.querySelector(".popup__caption"),X=document.querySelector(".popup__image"),Y=document.querySelector(".popup_content_update-profile-image"),Z=document.querySelector(".popup__close-button_content_profile-image"),ee=document.querySelector("#avatar-image-link-input"),te="Сохранить",ne=document.forms.profileForm,oe=document.forms.newAvatarLink;function re(e){var t=e.target.src;W.textContent=e.target.alt,X.src=t,X.alt=e.target.alt,c(N)}function ce(e){e.target.closest(".popup__container")||u(e.target)}function ue(e){if("Escape"===e.key){var t=document.querySelector(".popup_opened");null!==t&&u(t)}}function ae(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,o=new Array(t);n<t;n++)o[n]=e[n];return o}document.forms.cardData,$.addEventListener("click",(function(){u(document.querySelector(".popup_opened"))})),G.addEventListener("click",(function(){var e=z.closest(".popup_content_remove-card-confirmation").dataset.id;!function(e,t){fetch("".concat(h.baseUrl,"/cards/").concat(e),{method:"DELETE",headers:h.headers}).then((function(t){return t.ok?t.json():Promise.reject("При удалении карточки ".concat(e," сервер вернул: ").concat(t.status))})).then((function(){t.remove(),u(k)})).catch((function(e){console.log(e)}))}(e,document.querySelector('[data-card-id="'.concat(e,'"]')))})),R.addEventListener("click",(function(){return c(Y)})),B.addEventListener("click",(function(){u(N)})),J.addEventListener("click",(function(){K.value=I.textContent,Q.value=M.textContent,c(F)})),H.addEventListener("click",(function(){return u(F)})),Z.addEventListener("click",(function(){return u(Y)})),ne.addEventListener("submit",(function(e){var t,n;e.preventDefault(),a(!0,ne,te),t=K.value,n=Q.value,fetch("".concat(h.baseUrl,"/users/me"),{method:"PATCH",headers:h.headers,body:JSON.stringify({name:t,about:n})}).then((function(e){return e.ok?e.json():Promise.reject("При отправке данных пользователя сервер вернул: ".concat(e.status))})).then((function(){q.textContent=w.value,b.textContent=x.value,u(j)})).catch((function(e){console.log(e)})).finally((function(){a(!1,P,A)}))})),oe.addEventListener("submit",(function(e){var t;e.preventDefault(),a(!0,oe,te),t=ee.value,fetch("".concat(h.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:h.headers,body:JSON.stringify({avatar:t})}).then((function(e){return e.ok?e.json():Promise.reject("При отправке ссылки на новый аватар сервер вернул: ".concat(e.status))})).then((function(){E.src=C.value,u(L)})).catch((function(e){console.log(e)})).finally((function(){a(!1,U,A)}))}));var ie=document.querySelector(".profile__username"),le=document.querySelector(".profile__status"),se=document.querySelector(".profile__avatar");Promise.all([fetch("".concat(h.baseUrl,"/users/me"),{headers:h.headers}).then((function(e){return e.ok?e.json():Promise.reject("При получении данных профиля сервер вернул: ".concat(e.status))})).catch((function(e){console.log(e)})),fetch("".concat(h.baseUrl,"/cards"),{headers:h.headers}).then((function(e){return e.ok?e.json():Promise.reject("При получении массива карточек сервер вернул: ".concat(e.status))})).catch((function(e){console.log(e)}))]).then((function(e){var t,n,o=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var o,r,c,u,a=[],i=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;i=!1}else for(;!(i=(o=c.call(n)).done)&&(a.push(o.value),a.length!==t);i=!0);}catch(e){l=!0,r=e}finally{try{if(!i&&null!=n.return&&(u=n.return(),Object(u)!==u))return}finally{if(l)throw r}}return a}}(t,n)||function(e,t){if(e){if("string"==typeof e)return ae(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?ae(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),r=o[0],c=o[1];ie.textContent=r.name,le.textContent=r.about,se.src=r.avatar;var u=r._id;c.forEach((function(e){var t,n,o=e.link,c=e.name,a=e.likes.length,i=e._id,l=function(e,t){return e.owner._id===t}(e,u);v(l,o,c,a,i,(t=e.likes,n=r._id,t.some((function(e){return e._id===n}))))}))})).catch((function(e){console.log(e)})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(n){!function(e,n){var o=Array.from(e.querySelectorAll(n.inputSelector)),r=e.querySelector(n.submitButtonSelector);t(o,r,n),o.forEach((function(c){c.addEventListener("input",(function(){!function(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?function(e,t,n){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n.inputErrorClass),o.classList.remove(n.errorClass),o.textContent=""}(e,t,n):function(e,t,n,o){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.add(o.inputErrorClass),r.classList.add(o.errorClass),r.textContent=n}(e,t,t.validationMessage,n)}(e,c,n),t(o,r,n)}))}))}(n,e)}))}({formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__submit-button",inactiveButtonClass:"popup__submit-button_inactive",inputErrorClass:"popup__input_type_error",errorClass:"popup__input-error_active"}),D.forEach((function(e){e.addEventListener("mousedown",ce)}))})();