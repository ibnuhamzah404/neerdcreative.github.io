//postdate
const months = ['januari', 'februari', 'maret', 'april', 'mei', 'juni', 'juli', 'agustus', 'september', 'oktober', 'november', 'desember']
  , monthMin = ['', '', '', '', '', '', '', '', '', '', '', '']
  , days = ['minggu', 'senin', 'selasa', 'rabu', 'kamis', 'jumat', 'sabtu']
  , daysMin = ['', '', '', '', '', '', '']
  , seasons = ['musim dingin', 'musim semi', 'musim panas', 'musim gugur'];
function postDate(daysName, daysMinName, monthsName, monthsMinName, seasonsName) {
    const _counterLength = 60;
    for (let counter = 0; counter < _counterLength; counter++) {
        innerDate(counter, 'date-');
        innerDate(counter, 'date')
    }
    function innerDate(counter, dateType) {
        let newCounter;
        dateType === 'date-' ? newCounter = -counter : newCounter = counter;
        const _msInDay = 86400000
          , _localDate = new Date(Date.now() + (newCounter * _msInDay))
          , _day = _localDate.getDate() 
          , _month = _localDate.getMonth() + 1
          , _year = _localDate.getFullYear();
        const dayDefault = addZero(_day)
          , monthDefault = addZero(_month)
          , defaultDate = dayDefault + '.' + monthDefault + '.' + _year;
        const dateClass = dateType + counter
          , nodeList = document.querySelectorAll('.' + dateClass);
        for (let i = 0; i < nodeList.length; i++) {
            const dateFormat = nodeList[i].dataset.format;
            dateFormat !== undefined && dateFormat !== '' ? nodeList[i].innerHTML = String(changeFormat(dayDefault, _month, _year, dateFormat, newCounter)) : nodeList[i].innerHTML = defaultDate
        }
    }
    function changeFormat(_day, _month, _year, format, counter) {
        let innerFormat = format;
        const testFormat = ["dd", "mm", "yyyy", "monthFull", "year"]
          , dateFormat = {
            dd: _day,
            mm: addZero(_month),
            yyyy: _year,
            monthFull: getMonthName(_month, monthsName, false),
            year: getYearWithCounter(_year, counter),
        };
        for (let i = 0; i < testFormat.length; i++) {
            let string = testFormat[i];
            let regExp = new RegExp(string);
            innerFormat = innerFormat.replace(regExp, dateFormat[string]);
        }
        return innerFormat.split(' ').join(' ')
    }
    function getMonthName(_month, monthsName, bigFirstLetter, counter) {
        const monthCounter = !!counter ? counter : 0;
        let month;
        _month + monthCounter > 12 ? month = monthCounter - (12 - _month) : month = _month + monthCounter;
        _month + monthCounter <= 0 ? month = 12 + monthCounter + 1 : month = _month + monthCounter;
        return changeFirstLetter(bigFirstLetter, monthsName[month - 1])
    }
    function getYearWithCounter(year, counter) {
        return year + counter
    }
    function addZero(numb) {
        return numb < 10 ? '0' + numb : numb
    }
    function changeFirstLetter(isBig, str) {
        return isBig && str && str.length > 0 ? str[0].toUpperCase() + str.slice(1) : str
    }
}
if (document.body.classList.contains('ev-date')) {
    document.addEventListener("DOMContentLoaded", function() {
        postDate(days, daysMin, months, monthMin, seasons)
    });
}
//smooth scroll
for (var linkNav = document.querySelectorAll('[href^="#"]'), V = .2, i = 0; i < linkNav.length; i++)
    linkNav[i].addEventListener("click", function(e) {
        e.preventDefault();
        var n = window.pageYOffset
          , a = this.href.replace(/[^#]*(.*)/, "$1");
        t = document.querySelector(a).getBoundingClientRect().top,
        start = null,
        requestAnimationFrame(function e(i) {
            null === start && (start = i);
            var r = i - start
              , l = t < 0 ? Math.max(n - r / V, n + t) : Math.min(n + r / V, n + t);
            window.scrollTo(0, l);
            l != n + t ? requestAnimationFrame(e) : location.hash = a
        })
    }, !1);

//main
function main() {
    function GetCount() {
        var dateToday = new Date();
        var timeZone = dateToday.getTimezoneOffset();

        var amount = (Math.ceil((dateToday / 1000 / 60 - timeZone) / 60 / 24) * 60 * 60 * 24) - (Math.floor(dateToday / 1000 - timeZone * 60));

        let hours = Math.floor(amount / 60 / 60);
        let mins = Math.floor(amount / 60 % 60);
        let secs = Math.floor(amount % 60);

        if (hours < 10)
            hours = '0' + hours;
        if (mins < 10)
            mins = '0' + mins;
        if (secs < 10)
            secs = '0' + secs;
        $('.hours').html(hours);
        $('.mins').html(mins);
        $('.secs').html(secs);
    }

    GetCount();
    setInterval(GetCount, 1000);

    // Wheel
    var resultWrapper = document.querySelector('.overlay');
    var wheel = document.querySelector('.prize-wheel');
    var cursorText = document.querySelector('.wheel__cursor-text');
    let form = document.querySelector('.hidden-form');

    $('.wheel__cursor, .btn-wheel').click(function() {
        scrollToWheel();
        if (!wheel.classList.contains('rotated')) {
            wheel.classList.add('spin');
            setTimeout(function() {
                resultWrapper.style.display = "block";
                cursorText.innerHTML = "- 50%";
            }, 8000);
            wheel.classList.add('rotated');
        }

    });

    $(".btn--submit").click(function() {
        resultWrapper.style.display = "none";
        form.style.display = "block";

        $(".wheel__content-inner").slideUp(),
        $(".form").slideDown(),
        $(".bottom-teaser .sale").addClass("shown"),
        $(".form").addClass('shown__');

        scrollToForm();

        setInterval(function() {
            $(".new-price").slideDown();
        }, 5000);
    });

    function scrollToWheel() {
        $("html, body").animate({
            scrollTop: $("#toWheel").offset().top,
        }, 1000);
    }

    function scrollToForm() {
        $("html, body").animate({
            scrollTop: $(".hidden-form").offset().top,
        }, 1000);
    }
}

if (document.documentElement.clientWidth < 480) {
    window.addEventListener('scroll', function() {
        return setTimeout(main, 1000)
    }, {
        once: true,
        passive: true
    });
} else {
    main();
}

const doneTitle = "Komentar sudah diposting!"
  , doneText = "Terima kasih atas ulasan Anda!"
  , errorInputTitle = "Postingan gagal!"
  , errorInputText = "Beberapa bidang tidak diisi dengan benar."
  , errorSendTitle = "Anda sudah pernah memposting komentar sebelumnya."
  , errorSendText = "Kami mohon maaf atas ketidaknyamanan ini, sesuai dengan kebijakan penggunaan situs, komentar selanjutnya harus dimoderasi sebelum diposting."
  , emptyTownField = "Disembunyikan"
  , avatarUploaded = "Avatar diunggah"
  , imgUploaded = "foto diunggah"
  , fileTypeError = "Jenis file tidak valid"
  , fileSizeError = "Ukuran file tidak valid (hingga 2 MB)"
  , fileAllError = "Jenis dan ukuran file tidak valid (hingga 2MB)"
  , nameInput = document.querySelector(".ev-feedback__field--name") || !1
  , townInput = document.querySelector(".ev-feedback__field--town") || !1
  , ageInput = document.querySelector(".ev-feedback__field--age") || !1
  , commentInput = document.querySelector(".ev-feedback__field--comment") || !1
  , avatarInput = document.querySelector(".ev-feedback__chooser--avatar") || !1
  , imgInput = document.querySelector(".ev-feedback__chooser--image") || !1
  , submitBtn = document.querySelector(".ev-feedback__btn") || !1
  , answerBlock = document.querySelector(".ev-answer") || null
  , answerName = document.querySelector(".ev-answer__name") || null
  , answerTown = document.querySelector(".ev-answer__town") || null
  , answerAge = document.querySelector(".ev-answer__age") || null
  , answerComment = document.querySelector(".ev-answer__comment") || null
  , answerAvatar = document.querySelector(".ev-answer__avatar") || null
  , answerImg = document.querySelector(".ev-answer__img") || null
  , avatarLabel = document.querySelector(".ev-feedback__label--avatar")
  , imgLabel = document.querySelector(".ev-feedback__label--image");
let avatarTypeStatus = !1
  , avatarSizeStatus = !1
  , imgTypeStatus = !1
  , imgSizeStatus = !1;
const modalWindow = document.querySelector(".ev-modal")
  , avatarDefault = avatarLabel ? avatarLabel.innerText : ""
  , imgDefault = imgLabel ? imgLabel.innerText : "";
function setImgToLocalStorage(e, t) {
    const a = new FileReader
      , n = t.files[0]
      , l = n.size < 22e5
      , r = !!n && "image" === n.type.split("/")[0];
    r && l ? (a.readAsDataURL(n),
    a.onload = function() {
        null === localStorage.getItem(e) && null === localStorage.getItem("isPublished") && localStorage.setItem(e, a.result.toString())
    }
    ,
    validationFiles(t, !0, !0)) : !r && l ? validationFiles(t, !1, !0) : !l && r ? validationFiles(t, !0, !1) : !r && !l && validationFiles(t, !1, !1)
}
function setTextToLocalStorage(e, t) {
    0 !== t.length && localStorage.setItem(e, t.trim())
}
function clearFeedbackForm(e, t, a, n) {
    e && (e.value = ""),
    t && (t.value = ""),
    a && (a.value = ""),
    n && (n.value = "")
}
function setItemsToLocalStorage() {
    setTextToLocalStorage("isPublished", "true"),
    nameInput && setTextToLocalStorage("nameValue", nameInput.value),
    townInput && (0 !== townInput.value.length ? setTextToLocalStorage("townValue", townInput.value) : setTextToLocalStorage("townValue", emptyTownField)),
    ageInput && setTextToLocalStorage("ageValue", ageInput.value),
    commentInput && setTextToLocalStorage("commentValue", commentInput.value),
    hideImg("imgUrl", answerImg)
}
function changeModalState(e, t) {
    const a = document.querySelector(".ev-modal__title")
      , n = document.querySelector(".ev-modal__subtitle");
    a.innerText = e,
    n.innerText = t,
    modalWindow.classList.add("ev-modal--active")
}
function createComment() {
    null !== answerName && (answerName.innerText = localStorage.getItem("nameValue")),
    null !== answerTown && (answerTown.innerText = null !== localStorage.getItem("townValue") ? localStorage.getItem("townValue") : ""),
    null !== answerAge && (answerAge.innerText = null !== localStorage.getItem("ageValue") ? localStorage.getItem("ageValue") : ""),
    null !== answerComment && (answerComment.innerText = localStorage.getItem("commentValue")),
    null !== answerAvatar && (answerAvatar.src = null !== localStorage.getItem("avatarUrl") ? localStorage.getItem("avatarUrl") : answerAvatar.src),
    null !== answerImg && (answerImg.src = null !== localStorage.getItem("imgUrl") ? localStorage.getItem("imgUrl") : answerImg.src),
    "true" === localStorage.getItem("isPublished") ? answerBlock.classList.remove("ev-answer--hidden") : answerBlock.classList.add("ev-answer--hidden"),
    null === localStorage.getItem("imgUrl") && "true" === localStorage.getItem("isPublished") && hideImg("imgUrl", answerImg)
}
function postComment() {
    null !== localStorage.getItem("isPublished") ? (clearFeedbackForm(nameInput, townInput, ageInput, commentInput),
    setDefaultFileInputState(),
    changeModalState(errorSendTitle, errorSendText)) : (setItemsToLocalStorage(),
    createComment(),
    clearFeedbackForm(nameInput, townInput, ageInput, commentInput),
    setDefaultFileInputState(),
    changeModalState(doneTitle, doneText))
}
function changeFormStyles() {
    const e = document.querySelector(".ev-feedback")
      , t = document.querySelector(".ev-feedback__section--data")
      , a = document.querySelector(".ev-feedback__section--files")
      , n = document.querySelectorAll(".ev-feedback__profile .ev-feedback__field")
      , l = document.querySelectorAll(".ev-feedback__file");
    2 === n.length ? t.classList.add("ev-feedback__section--two") : 1 === n.length && t.classList.add("ev-feedback__section--one"),
    1 === l.length && a.classList.add("ev-feedback__section--one"),
    n.length > 1 && 1 === l.length && a.classList.add("ev-feedback__section--full"),
    1 === n.length && 1 === l.length && e.classList.add("ev-feedback--structure")
}
function changeFileInputState(e, t, a, n, l, r, o) {
    const i = e.parentNode
      , u = i.children[1].classList.contains("ev-feedback__label") ? i.children[1] : i.children[0];
    t && a ? (i.classList.remove("ev-feedback__file--error"),
    i.classList.add("ev-feedback__file--loaded"),
    u.innerText = n) : (i.classList.remove("ev-feedback__file--loaded"),
    i.classList.add("ev-feedback__file--error"),
    t || a ? t && !a ? u.innerText = r : !t && a && (u.innerText = l) : u.innerText = o)
}
function setDefaultFileInputState() {
    const e = document.querySelectorAll(".ev-feedback__file");
    for (let t = 0; t < e.length; t++)
        e[t].classList.remove("ev-feedback__file--loaded"),
        e[t].classList.remove("ev-feedback__file--error");
    avatarLabel && (avatarLabel.innerText = avatarDefault),
    imgLabel && (imgLabel.innerText = imgDefault)
}
function validationForm() {
    const e = !nameInput || validationTextFields(nameInput, 1)
      , t = !ageInput || validationAge(ageInput)
      , a = !commentInput || validationTextFields(commentInput, 5);
    e && t && a ? postComment() : changeModalState(errorInputTitle, errorInputText)
}
function validationTextFields(e, t) {
    return e.value.length < t ? (e.parentElement.classList.add("ev-feedback__profile--error"),
    !1) : (e.parentElement.classList.remove("ev-feedback__profile--error"),
    !0)
}
function validationAge(e) {
    return e.value.length > 0 ? e.value >= 18 && e.value <= 120 ? (e.parentElement.classList.remove("ev-feedback__profile--error"),
    !0) : (e.parentElement.classList.add("ev-feedback__profile--error"),
    !1) : (e.parentElement.classList.remove("ev-feedback__profile--error"),
    !0)
}
function validationFiles(e, t, a) {
    "avatar" === e.name ? (avatarTypeStatus = t,
    avatarSizeStatus = a) : (imgTypeStatus = t,
    imgSizeStatus = a)
}
function changeErrorDescState(e) {
    const t = e.clientHeight + 2;
    e.nextElementSibling.classList.contains("ev-input-error") && (e.nextElementSibling.style.top = t + 10 + "px"),
    e.parentElement.classList.contains("ev-feedback__profile--error") ? e.nextElementSibling.classList.remove("ev-input-error--hidden") : e.nextElementSibling.classList.add("ev-input-error--hidden")
}
function hideImg(e, t) {
    null === localStorage.getItem(e) && t && (t.style.display = "none")
}
String.prototype.replaceAll = function(e, t) {
    return this.replace(new RegExp(e,"g"), t)
}
,
window.addEventListener("DOMContentLoaded", function() {
    createComment(),
    changeFormStyles()
}),
nameInput && nameInput.addEventListener("input", function() {
    validationTextFields(nameInput, 1, !0),
    changeErrorDescState(nameInput)
}),
nameInput && nameInput.addEventListener("focus", function() {
    changeErrorDescState(nameInput)
}),
nameInput && nameInput.addEventListener("blur", function() {
    this.nextElementSibling.classList.add("ev-input-error--hidden")
}),
townInput && townInput.addEventListener("keydown", function(e) {
    Number(e.key) && e.preventDefault()
}),
townInput && townInput.addEventListener("change", function() {
    this.value = townInput.value.replaceAll(/[0-9]/, "")
}),
ageInput && ageInput.addEventListener("input", function(e) {
    isNaN(e.data) && (this.value = this.value.replace(/[^0-9]/, "")),
    validationAge(ageInput),
    changeErrorDescState(ageInput)
}),
ageInput && ageInput.addEventListener("change", function() {
    this.value = ageInput.value.replaceAll(/[A-Za-zА-Яа-яЁё]/, "")
}),
ageInput && ageInput.addEventListener("focus", function() {
    changeErrorDescState(ageInput)
}),
ageInput && ageInput.addEventListener("blur", function() {
    this.nextElementSibling.classList.add("ev-input-error--hidden")
}),
commentInput && commentInput.addEventListener("input", function() {
    validationTextFields(commentInput, 5),
    changeErrorDescState(commentInput)
}),
commentInput && commentInput.addEventListener("focus", function() {
    changeErrorDescState(commentInput)
}),
commentInput && commentInput.addEventListener("blur", function() {
    this.nextElementSibling.classList.add("ev-input-error--hidden")
}),
avatarInput && avatarInput.addEventListener("change", function() {
    setImgToLocalStorage("avatarUrl", this),
    changeFileInputState(avatarInput, avatarTypeStatus, avatarSizeStatus, avatarUploaded, fileTypeError, fileSizeError, fileAllError)
}),
imgInput && imgInput.addEventListener("change", function() {
    setImgToLocalStorage("imgUrl", this),
    changeFileInputState(imgInput, imgTypeStatus, imgSizeStatus, imgUploaded, fileTypeError, fileSizeError, fileAllError)
}),
submitBtn.addEventListener("click", function(e) {
    e.preventDefault(),
    validationForm()
}),
modalWindow.addEventListener("click", function(e) {
    e.preventDefault();
    const t = e.target;
    (t.classList.contains("ev-modal") || t.classList.contains("ev-modal__close") || t.classList.contains("ev-modal__btn")) && modalWindow.classList.remove("ev-modal--active")
});
