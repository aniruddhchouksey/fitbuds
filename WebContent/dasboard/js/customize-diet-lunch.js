var muriLunch=null,suri=null,muriLunchArray=[];
/*$(document).ready(function () {
    $(".dropdowns").typeahead({
        source: function (query, result) {
            var data = {
                q: query,
                app_id: 'a6471d58',
                app_key: '1371084639e0deae5ca2cae1f0b8a534'
            };
            $.ajax({
                url: 'http://api.edamam.com/auto-complete',
                method: 'GET',
                data: data,
                success: function (data) {
                    result($.map(data, function (item) {
                        return item;
                    }));
                }
            });
        }
    });
//    $("#dropdownLunch").typeahead({
//        source: function (query, result) {
//            var data = {
//                q: query,
//                app_id: 'a6471d58',
//                app_key: '1371084639e0deae5ca2cae1f0b8a534'
//            };
//            $.ajax({
//                url: 'http://api.edamam.com/auto-complete',
//                method: 'GET',
//                data: data,
//                success: function (data) {
//                    result($.map(data, function (item) {
//                        return item;
//                    }));
//                }
//            });
//        }
//    });
});*/
function searchLunch(){
    var selectedItem=$("#inlineFormCustomSelectLunch option:selected").text();
    $("#inlineFormCustomSelectLunch option:selected").addClass('active');
    $("#inlineFormCustomSelectLunch").show();
    $('#foodresultLunch').show();
    alert(selectedItem);
	var item = $("#dropdownLunch").val();
	$("#inlineFormCustomSelectLunch").empty();
	alert(item+" item");
	var link = "https://api.edamam.com/api/food-database/parser?ingr=" + item + "&app_id=a6471d58&app_key=1371084639e0deae5ca2cae1f0b8a534";
    $.ajax({
        url: link,
        type: "GET",
        dataType: 'json',
        success: function (data) {
            var jsonData = data;
            $("#measurements").empty();
            $("#qualified").empty();
            var name=data.hints[0].food.label;
            var isSame=false;
            if($("#nameLunch").text()===name) isSame=true;
            else isSame=false;
            $("#nameLunch").text(name);
            if(!isSame) {
                muriLunch=null;
            }
            $("#inlineFormCustomSelectLunch").append("<option value='0' selected>"+data.hints[0].measures[0].label+"</option>");
            muriLunchArray[0]=data.hints[0].measures[0].uri;
            for (var i = 1; i < data.hints[0].measures.length; i++) {
                var m = data.hints[0].measures[i].label;
                var uri = data.hints[0].measures[i].uri;
                if(m===selectedItem && isSame)
				$("#inlineFormCustomSelectLunch").append("<option selected value='"+i+"'>"+m+"</option>");
            else
                $("#inlineFormCustomSelectLunch").append("<option value='"+i+"'>"+m+"</option>");
				muriLunchArray[i+1]=uri;
            }
            // if ('qualified' in data.hints[0].measures[0]) {
              // for (var i = 0; i <
				// data.hints[0].measures[0].qualified.length; i++) {
                // var m = data.hints[0].measures[0].qualified[i][0].label;
                  // var uri = data.hints[0].measures[0].qualified[i][0].uri;
                    // $("#qualified").append("<a href='#' onclick=\"showsize('"
					// + m + "','" + uri + "')\">" + m + "</a>");
                // }
            // }
            // if (search === null)
            alert("search lunch before");
                displayLunch(jsonData.hints[0].food.foodId);

        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Oops! Something went wrong!");

        },
    });
	}
	function checkLunch(index){

		muriLunch=muriLunchArray[index+1];
		searchLunch();
		alert(muriLunch+" bababa");
	}
	function displayLunch(fid) { 
		alert(muriLunch+" in display");
        if(muriLunch==null) muriLunch=muriLunchArray[0];
    if (suri !== null) {
        var food = {
            ingredients: [
                {
                    "quantity": 1,
                    "measureURI": muriLunch,
                    "foodId": fid,
                    "qualifiers": [suri]
                }
            ]
        };
    } else {
        var food = {
            ingredients: [
                {
                    "quantity": 1,
                    "measureURI": muriLunch,
                    "foodId": fid
                }
            ]
        };
    }
    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        url: "https://api.edamam.com/api/food-database/nutrients?app_id=a6471d58&app_key=1371084639e0deae5ca2cae1f0b8a534",
        data: JSON.stringify(food),
        success: function (data) {
            $("#facts").empty();
            $("#nameLunch").text(data.ingredients[0].parsed[0].food);
            $("#sp1Lunch").empty();
            $("#sp1Lunch").append(" ("+data.ingredients[0].parsed[0].weight+"g)");
            var num=$("#num").val();
            var check = data.totalNutrients;
			$("#caloriesLunch").text(Math.round(check.ENERC_KCAL.quantity*100)/100 + check.ENERC_KCAL.unit);
			$("#proteinLunch").text(Math.round(check.PROCNT.quantity*100)/100 + check.PROCNT.unit);
			$("#fatsLunch").text(Math.round(check.FAT.quantity*100)/100 + check.FAT.unit);
			$("#carbsLunch").text(Math.round(check.CHOCDF.quantity*100)/100  + check.CHOCDF.unit);
			$("#piechartLunch").append("<canvas id='foodpiechartLunch'></canvas>");
          //  update(Math.round(check.PROCNT.quantity*100)/100,Math.round(check.FAT.quantity*100)/100,Math.round(check.CHOCDF.quantity*100)/100  + check.CHOCDF.unit);
			

        }
    });
}
	
	function addLunch(){
	if($("#nameLunch").text()!='Eggbro'){
       $("#lunch").append("<tr>" +
       		"<th scope='row' >"+$('#nameLunch').text()+"</th>" +
       		"<td>"+$('#caloriesLunch').text()+"</td>" +
       				"<td>"+$('#proteinLunch').text()+"</td>" +
       						"<td>"+$('#carbsLunch').text()+"</td>" +
       								"<td>"+$('#fatsLunch').text()+"</td></tr>");
	}
	alert(parseInt($("#caloriesTotalLunch").text()));
	$("#caloriesTotal").text(parseFloat($("#caloriesTotal").text())+parseFloat($('#calories').text(),10));
	$("#proteinTotal").text(parseFloat($("#proteinTotal").text())+parseFloat($('#protein').text(),10));
	$("#carbsTotal").text(parseFloat($("#carbsTotal").text())+parseFloat($('#carbs').text(),10));
	$("#fatsTotal").text(parseFloat($("#fatsTotal").text())+parseFloat($('#fats').text(),10));
       $("#exampleModal").modal('toggle');
	}