const basic = {
    "title": "박석범 & 장세희 결혼합니다.",
    "groom": {
        "name" : "박석범",
        "phone" : "01000000000",
    },
    "bride": {
        "name": "장세희",
        "phone": "01000000000",
    },
    "date": {
        "year" : "2024",
        "month" : "09",
        "day" : "28",
        "hour" : "12",
        "minute" : "40",
    },
    "location": {
        "name" : "루이비스 대전",
        "address" : "대전광역시 유성구 테크노중앙로 161 호텔 스카이파크 1층",
        "x" : "36.4246584",
        "y" : "127.3979372"
    },
    "info": {

    }
}
const holidays = [16,17,18];
$(document).ready(function (){

    new WOW().init();

    let msnry = $('#grid-container').masonry({
        columnWidth: '.grid-sizer',
        itemSelector: '.grid-item',
        percentPosition: true,
        gutter : 20,
        transitionDuration: 0
    });

    imagesLoaded( '#grid-container' ).on( 'progress', function() {
       // msnry.layout();
        $('#grid-container').masonry('layout');

    });

    $('.grid-item').magnificPopup(
        {
            delegate: 'img',
            type:'image',
            gallery: {
                enabled: true
            },
            callbacks: {
                elementParse: function(qw) {
                    qw.src = qw.el.attr('src');
                }
            }
        });

    drawCalendar(basic.date);
    loadCountdown(basic.date);

    getKakaoMap(basic.location);

});

function drawCalendar(date) {
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const year = parseInt(date.year);
    const month = parseInt(date.month);
    const day = parseInt(date.day);

    const daysInMonth = new Date(year, month, 0).getDate();
    const firstDayOfMonth = new Date(year, month - 1, 1).getDay();

    const calendarContainer = document.getElementById("calendar");

    let calendarHTML = `
    <div>${monthNames[month - 1]} ${year}</div>
    <div class="week">
        ${["S", "M", "T", "W", "T", "F", "S"].map((day, index) => `<div class="${'day'}">${day}</div>`).join('')}
    </div>`;

    let dayCount = 1;
    for (let i = 0; i < 6; i++) {
        let line = "";
        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < firstDayOfMonth) {
                line += "<div class='empty'></div>";
            } else if (dayCount > daysInMonth) {
                break;
            } else {
                let dateClass = "";
                if (holidays.includes(dayCount)) {
                    dateClass = "holiday";
                }
                if (dayCount === day) {
                    dateClass = "highlight";
                }
                line += `<div class='day ${dateClass}'>${dayCount}</div>`;
                dayCount++;
            }
        }
        calendarHTML += "<div class='week'>" + line + "</div>";
        if (dayCount > daysInMonth) {
            break;
        }
    }

    calendarContainer.innerHTML = calendarHTML;
}

function loadCountdown(date){

    const wTime = new Date(date.year,parseInt(date.month)-1,date.day,date.hour, date.minute);
    const wDay = new Date(date.year,parseInt(date.month)-1,parseInt(date.day)+1,date.hour, date.minute);

    $('#date-countdown').countdown({ until: wTime, format: 'dHMS', compact: true, timezone: +9 });
    $('#dday-countdown').countdown({ until: wDay, format: 'dHMS', compact: true, layout: '{dn}', timezone: +9 });

}

function getKakaoMap(location){
    const container = document.getElementById('map');

    const xy = new kakao.maps.LatLng(location.x, location.y);
    let options = {
        center: xy,
        level: 3
    };

    let map = new kakao.maps.Map(container, options);

    let marker = new kakao.maps.Marker({
        position: xy,
        map: map
    });

    marker.setPosition(xy);
}
function startNavigation(location) {
    Kakao.Navi.start({
        name: location.name,
        x: location.x,
        y: location.x,
        coordType: 'wgs84',
    });
}
function copyLink(){

    let url = window.document.location.href;
    copyToClipboard(url);
    alert('링크가 복사되었습니다.');
}

function copyToClipboard(val) {
    let t = document.createElement("textarea");
    document.body.appendChild(t);
    t.value = val;
    t.select();
    document.execCommand('copy');
    document.body.removeChild(t);
}