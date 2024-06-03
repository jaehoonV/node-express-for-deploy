$(document).ready(function () {
   let eventSeq = 0; // 고유한 seq 값을 위한 전역 변수
   createCalendar();

   $('#group_select').change(function () {
      const selectedValue = $(this).val();
      console.log('Selected value:', selectedValue);
      let page = `<object style='width:100%; height:1000px; border: none;" type='text/html' data="./fullcalendar-6.1.13/examples/`;

      switch (selectedValue) {
         case '1': page += `background-events.html"></object>`;
            break;
         case '2': page += `daygrid-views.html"></object>`;
            break;
         case '3': page += `external-dragging-2cals.html"></object>`;
            break;
         case '4': page += `external-dragging-builtin.html"></object>`;
            break;
         case '5': page += `full-height.html"></object>`;
            break;
         case '6': page += `list-sticky-header.html"></object>`;
            break;
         case '7': page += `list-views.html"></object>`;
            break;
         case '8': page += `month-view.html"></object>`;
            break;
         case '9': page += `multimonth-view.html"></object>`;
            break;
         case '10': page += `natural-height.html"></object>`;
            break;
         case '11': page += `selectable.html"></object>`;
            break;
         case '12': page += `timegrid-views-modal.html"></object>`;
            break;
         case '13': page += `timegrid-views.html"></object>`;
            break;
         default: page += `background-events.html"></object>`;
            break;
      }

      if (selectedValue == '0') {
         $('#wrap').show();
         $('#save_btn').show();
         $('#iframe_div').hide();
      } else {
         $('#wrap').hide();
         $('#save_btn').hide();
         $('#iframe_div').html(page);
      }

   });

   function createCalendar() {
      let delete_events_seqs = [];
      let calendarEl = document.getElementById('calendar');
      let containerEl = document.getElementById('external-events-list');
      new FullCalendar.Draggable(containerEl, {
         itemSelector: '.fc-event',
         eventData: function (eventEl) {
            return {
               title: eventEl.innerText.trim(),
               description: eventEl.innerText.trim(),
               extendedProps: {
                  seq: eventSeq++,
               },
            }
         }
      });

      let today = dateFormatFunc(new Date());
      let cal_data = createData(10);

      let calendar = new FullCalendar.Calendar(calendarEl, {
         headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
         },
         locale: 'ko', // 한국어 설정
         initialDate: today,
         navLinks: true, // can click day/week names to navigate views
         editable: true,
         droppable: true, // this allows things to be dropped onto the calendar
         dayMaxEvents: true, // allow "more" link when too many events
         eventLimit: true,
         events: cal_data,
         drop: function (info) {
            if (document.getElementById('drop-remove').checked) {
               info.draggedEl.parentNode.removeChild(info.draggedEl);
            }
         },
         eventAdd: function (info) { // 이벤트가 추가되면 발생하는 이벤트
            console.log('이벤트가 추가되었습니다:');
            console.log('제목:', info.event.title);
            console.log('시작일:', info.event.start);
            console.log('종료일:', info.event.end);
            console.log('고유 ID (seq):', info.event.extendedProps.seq);
         },
         eventChange: function (info) {
            console.log('이벤트가 변경되었습니다:');
            console.log('제목:', info.event.title);
            console.log('시작일:', info.event.start);
            console.log('종료일:', info.event.end);
            console.log('고유 ID (seq):', info.event.extendedProps.seq);
         },
         eventRemove: function (info) {
            console.log('이벤트가 삭제되었습니다:');
            console.log('제목:', info.event.title);
            console.log('시작일:', info.event.start);
            console.log('종료일:', info.event.end);
            console.log('고유 ID (seq):', info.event.extendedProps.seq);
            delete_events_seqs.push(info.event.extendedProps.seq);
         },
         eventClick: function (info) {
            // 팝업 창에 전달할 데이터
            const title = info.event.title;
            const start = info.event.start.toISOString().split('T')[0];
            const end = info.event.end ? info.event.end.toISOString().split('T')[0] : '';
            const description = info.event.extendedProps.description;
            const seq = info.event.extendedProps.seq;

            console.log('Event: ' + title);
            console.log('Coordinates: ' + info.jsEvent.pageX + ',' + info.jsEvent.pageY);
            console.log('View: ' + info.view.type);

            //info.el.style.borderColor = 'red';

            // 팝업 창 열기
            var left = Math.ceil((window.screen.width - 400) / 2);
            var top = Math.ceil((window.screen.height - 400) / 2);

            const popup = window.open('', '_blank', 'width=400,height=400,left=' + left + ',top=' + top + '');
            popup.document.write(`
               <html>
               <head>
                  <title>Event Details</title>
               </head>
               <script>
               function deleteEvent(seq){
                  window.opener.delete_event(seq);
                  window.close();
               }
               </script>
               <body>
                  <h2>Event Details</h2>
                  <p><strong>Title:</strong> ${title}</p>
                  <p><strong>Start:</strong> ${start}</p>
                  <p><strong>End:</strong> ${end}</p>
                  <p><strong>Description:</strong> ${description}</p>
                  <p><strong>Seq:</strong> ${seq}</p>
                  <button onclick="window.close()">Close</button>
                  <button onclick="deleteEvent(${seq})">Delete</button>
               </body>
               </html>
            `);
         }
      });

      calendar.render();

      function saveEvents(){
         let allEvents = calendar.getEvents();
         let allEvents_label = "";
         allEvents.forEach(function(event){
            allEvents_label += "<p><strong>Title = " + event.title + " / Start = " + dateFormatFunc(event.start) + " / End = " + dateFormatFunc(event.end) + " / Seq = " + event.extendedProps.seq +"</strong></p>";
         });

         // 팝업 창 열기
         var left = Math.ceil((window.screen.width - 600) / 2);
         var top = Math.ceil((window.screen.height - 600) / 2);

         const popup = window.open('', '_blank', 'width=600,height=600,left=' + left + ',top=' + top + '');
         popup.document.write(`
            <html>
            <head>
               <title>Save Events</title>
            </head>
            <script>
            function deleteEvent(seq){
               window.opener.delete_event(seq);
               window.close();
            }
            </script>
            <body>
               <h3>Events</h3>
               ${allEvents_label}
               <h3>Delete Events Seqs : ${delete_events_seqs}</h3>
               <button onclick="window.close()">Close</button>
            </body>
            </html>
         `);
      }

      $('#save_btn').on("click", function(){
         saveEvents();   
      });

      window.delete_event = function(seq) {
         let event = calendar.getEvents().find(event => event.extendedProps.seq === seq);
         if (event) {
            event.remove(); // 이벤트 삭제
         }
      }

   }

   /**
    * Date 타입의 데이터를 'YYYY-MM-DD' 형식으로 값을 반환한다.
    * @param {Date} d 날짜
    * @returns {String} ex) 2024-01-01
    */
   function dateFormatFunc(d) {
      let year = d.getFullYear();
      let month = d.getMonth() + 1;
      month = month < 10 ? `0${month}` : month;
      let day = d.getDate();
      day = day < 10 ? `0${day}` : day;

      return `${year}-${month}-${day}`;
   }

   /**
    * Date 타입의 시작일 데이터와 종료일 데이터 사이의 날짜를 'YYYY-MM-DD' 형식 값으로 반환한다.
    * @param {Date} start 시작날짜
    * @param {Date} end 종료날짜
    * @returns {String} ex) 2024-01-01
    */
   function getRandomDate(start, end) {
      const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
      return dateFormatFunc(date);
   }

   /**
    * {title, start, end} 형식의 값을 가진 배열을 반환한다. 
    * @param {Integer} n 반환받을 데이터의 수
    * @returns {Array} ex) [{title: 'Event',start: '2024-01-01',end: '2024-01-05'},{title: 'Conference',start: '2024-01-04',end: '2024-01-08'}]
    */
   function createData(n) {
      const titles = ['Long Event', 'Conference', 'Meeting', 'Workshop', 'Seminar'];
      const events = [];

      for (let i = 0; i < n; i++) {
         const start = getRandomDate(new Date(2024, 4, 1), new Date(2024, 6, 30));
         const startDate = new Date(start);
         const endDate = new Date(startDate);
         const daysToAdd = Math.floor(Math.random() * 7) + 1; // 최대 7일까지
         endDate.setDate(endDate.getDate() + daysToAdd);

         const end = dateFormatFunc(endDate);
         const title = titles[Math.floor(Math.random() * titles.length)];
         const description = title;
         const extendedProps = { seq: eventSeq++ };

         events.push({ title, start, end, description, extendedProps });
      }
      console.log(events);
      return events;
   }
});