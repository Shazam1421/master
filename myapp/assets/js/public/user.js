var userObject = {};

function userLogin(data){
	if(data.user){
		userObject = data;  
		if(data.user.userType==2){ $(".create-event").show(); }
		if(data.user.userType==3){ $(".create-event").show();  }

		$(".login-form, .get-started, .pilot-profile, .passenger-profile, .sign-up").hide();
		$(".user-indicator").show();
		$(".username").text(data.name);
	}
}

$(document).ready(function(){

	$(".exit").on("click",function(){  
		$.ajax({
			url: "user/logout",
			success: function(data){
				if(data.logout){ location.reload(); }
			}
		});
	});

	$(".signup-before").on("click",function(){

		$("a[href='#top']").click();
		$(".get-started").click();

	});

	$.ajax({
		url: "user/checksession",
		method: "GET",
		success: function(data){
			userLogin(data);
		}
	});

	$(".get-started").on("click",function(){

		$(".sign-up").show();
		$(this).hide();

	});

       $(".event-close").on("click",function(){

		$(".sign-up").hide();
		$(".get-started").show();		
	});


	$(".signup-form").submit(function(e){

		e.preventDefault();

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
					$(".sign-up").hide();
					if(data.userType=="3"){ $(".club-profile").show(); }
					if(data.userType=="2"){ $(".pilot-profile").show(); }
					if(data.userType=="1"){ $(".passenger-profile").show(); }
					
				}

			}

		});

	});


	$(".profile-form").submit(function(e){
		e.preventDefault();

		var formData = $(this).serializeArray();

		var url = $(this).attr("action");
		console.log(url);
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



					$(".profile-form").html("<h2>Your registration complete!<h2><p>Try login now.</p>");
					
				}

			}

		});
	});
	
	

	$(".login-form").submit(function(e){
			e.preventDefault();

			var formData = $(this).serializeArray();

			var url = $(this).attr("action");
			console.log(url);
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

						userLogin(data);

						//if(data.userType=="2"){ $(".passenger-profile").show(); }
						//if(data.userType=="1"){ $(".pilot-profile").show(); }
						
					}

				}

			});
	});

});