function makeClubsList(){
	$.ajax({
		url: "club/getclubs",
		method: "GET",
		dataType: "JSON",
		success: function(data){
			var club_option_html = "";
			for(var i=0; i<data.length; i++){
				club_option_html += "<option value="+data[i].id+">"+data[i].name+"</option>";
				$(".form-control[name=clubs]").html(club_option_html);
			}
		}
	});
}

function renderCalendar(){
	$("#calendar").html("");
	
	$.getScript('js/vendor/fullcalendar.js', function() {

    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();
    
    $.ajax({
    	url: "event/calendar/",
    	dataType: "JSON",
    	success: function(data){

    		//console.log(data);
    		eventArr = [];
    		for(i=0; i<data.length; i++){

    			var formatDateTime = data[i].date.split("T");
    			var formatDate = formatDateTime[0].split("-");

    			eventArr.push({ 
    				id: data[i].id, 
    				title: data[i].eventType.title, 
    				start: new Date(formatDate[0],formatDate[1]-1,formatDate[2]) 
    			});

    		}
    		console.log(eventArr);
	    	 $('#calendar').fullCalendar({
			 height: 500,
			 disableDragging: true,
			 disableResizing: true,
		        header: {
		            left: 'prev,next today',
		            center: 'title',
		            right: 'month,agendaWeek,agendaDay'
		        },
		        editable: true,
		        events: eventArr,
			    eventClick: function(event) {

			    	$(".join-event-button, .event-cart, .already-applied-event, .signup-before").hide();

			    	$(".event-card").show();
			    	$.ajax({
			    		url: "event/"+event.id,
			    		dataType: "JSON",
			    		success: function(data){
			    			console.log(data);
			    			var date = data.date.split("T");
			    			$(".event-card-type").text(data.eventType.title);
			    			$(".event-card-description").text(data.description);
			    			$(".event-card-club").text(data.clubs[0].name);
			    			$(".event-card-date").text(date[0]);
			    			$(".event-card-time").text(data.time);
			    			$(".confirm-event-button").attr("data-event-id",data.id);

			    			var alreadyAppliedEvent = false;

			    			if(userObject.user){

			    				for(pass in data.passengers){
			    					if(pass.id == userObject.user.PassengerId){ alreadyAppliedEvent = true; console.log("-"); console.log(userObject); console.log("-"); }
			    				}

			    				if(userObject.user.userType==1 && !alreadyAppliedEvent ){ $(".join-event-button").show(); } 
			    				if(alreadyAppliedEvent){ $(".already-applied-event").show(); }

			    			} else {
			    				$(".signup-before").show();
			    			}
			    			
			    		}
			    		
			    	});
				    
				  //   if (event.title) {
				  //       alert("ID: " + event.id + "\r\n" + "Event: " + event.title + "\r\n" + "Date: " + event.start + " - " + event.end);
					 // $(this).css('border-color', 'red');
				  //       return false;
				  //   }
				}
			});

    	}

    });   
        
    
	});
}

$(document).ready(function(){
	$('#inputDate').datepicker({ dateFormat: "yy-mm-dd" });
	
	$(".create-event").on("click",function(){

		$(this).hide();

		$(".event-block").show();

		makeClubsList();
		
	});

	$(".create-event-form").submit(function(e){

		console.log('foo');
		var formData = $(this).serializeArray();

		var url = $(this).attr("action");

		var self = this;
		$(self).find(".bg-warning").html("");
		$(".form-group").removeClass("has-error");

		$.ajax({

			url: url,
			method: "GET",
			data: formData,
			success: function(data){

				if (data.error){
					//console.error(data.invalidAttributes);

					var arrErr = [];
					
					for(err in data.invalidAttributes){
						
						
						
						for (e in err){
							console.log(err);
							
							if(data.invalidAttributes[err][e]){
								arrErr.push({ "input":err,"message":data.invalidAttributes[err][e].message });
							}
						}

					}

					//console.log(arrErr.length);

					for(error in arrErr) {
						$(self).find("input[name="+arrErr[error].input+"]").parents(".form-group").addClass("has-error");
						if(arrErr[error]){ $(self).find(".bg-warning").append(arrErr[error].input+": "+arrErr[error].message+"<br />"); }
						
					}

				} else{
					console.log(data)
					$(self).html("<p>Event successfully created!</p>");

					renderCalendar();
					setTimeout(function(){ $("a[href=#services]").click(); },1500);
				}

			}

		});

		e.preventDefault();
	});
	
	$(".event-close").on("click",function(){  

		$(".event-card").hide();

	});

	$(".join-event-button").on("click",function(){

		$(".event-cart").show();
	});

	$(".confirm-event-button").on("click",function(){
		var eventId = $(this).attr("data-event-id");  
		$.ajax({
			url: "event/apply",
			dataType: "JSON",
			data: {"event": eventId },
			success: function(data){
				$(".already-applied-event, .event-cart, .join-event-button").toggle();
			}

		});
	});

	renderCalendar();

});