console.log("console are triggered ...")
// typed text animaiton 
let textAnimation = new Typed("#textSlider", {
    strings: ["For new and older visitors of Terah", "To see all about terah", "24 Hours opened online Services", "Free HD-Pictures Of Terah", "Complete located maps for visitors"],
    typeSpeed: 60,
    backSpeed: 30,
    loop: true,
    startDelay: 3000,
    backDelay: 1000,
    // showCursor:false,
    shuffle: true,
});

let textAnimationPer = new Typed("#PeraAni", {
    strings: ["چہ دا وطن پہ مینہ مست زہ افریدای یم <br> دا چانہ پٹ نایم دا غرونو ازمارے یم"],
    typeSpeed: 10,
    showCursor: false
});


// start Iterator for places 
// data in object 
const Data = [{
        placeName: "jamrud",
        stopWatch: "South West",
        fromPesh: "2 km",
        fromMaidan: "1km",
        pera: "this is ghazna khan and this is ghazna khan and ghazna khan are very bad in coding ..",
        btnReadMore: "Full Documentry",
        btnDownload: `<i class="fa fa-download"></i>`
    },

    {
        placeName: "Babi Khyber",
        stopWatch: "North West",
        fromPesh: "21 km",
        fromMaidan: "11km",
        pera: "this is ghazna khan and this is ghazna khan and ghazna khan are very bad in coding ..",
        btnReadMore: "Full Documentry",
        btnDownload: `<i class="fa fa-download"></i>`
    },

]

const Iterator = function (arr) {
    let value = 0;
    return {
        value: arr[value++],
        next: function () {
            if (value == 100) {
                return {

                }
            } else {
                return {

                }
            }
        }
    }
}