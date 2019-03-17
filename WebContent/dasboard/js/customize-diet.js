var muri=null,suri=null,muriArray=[];
$(document).ready(function () {
    //$('#foodresult').show();
    $("#dropdown").typeahead({
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
});
function search(){
    //alert($("#inlineFormCustomSelect option:selected").text());
    var selectedItem=$("#inlineFormCustomSelect option:selected").text();
    //alert("selected "+selected);
    $("#inlineFormCustomSelect option:selected").addClass('active');
    
    $("#inlineFormCustomSelect").show();
    $('#foodresult').show();
	var item = $("#dropdown").val();
	$("#inlineFormCustomSelect").empty();
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
            if($("#name").text()===name) isSame=true;
            else isSame=false;
            $("#name").text(name);
            if(!isSame) {
                muri=null;
            }
            //alert($("#name").text(name));
            $("#inlineFormCustomSelect").append("<option value='0' selected>"+data.hints[0].measures[0].label+"</option>");
            muriArray[0]=data.hints[0].measures[0].uri;

            for (var i = 1; i < data.hints[0].measures.length; i++) {
                var m = data.hints[0].measures[i].label;
                var uri = data.hints[0].measures[i].uri;
                //alert(m+" "+uri);
                if(m===selectedItem && isSame)
				$("#inlineFormCustomSelect").append("<option selected value='"+i+"'>"+m+"</option>");
            else
                $("#inlineFormCustomSelect").append("<option value='"+i+"'>"+m+"</option>");
				muriArray[i+1]=uri;
            }
            //if ('qualified' in data.hints[0].measures[0]) {
              //  for (var i = 0; i < data.hints[0].measures[0].qualified.length; i++) {
                //    var m = data.hints[0].measures[0].qualified[i][0].label;
                  //  var uri = data.hints[0].measures[0].qualified[i][0].uri;
                    //$("#qualified").append("<a href='#' onclick=\"showsize('" + m + "','" + uri + "')\">" + m + "</a>");
                //}
            //}
            //if (search === null)
                display(jsonData.hints[0].food.foodId);

        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Oops! Something went wrong!");

        },
        data: JSON.stringify()
    });
    // $(document).ready(function(){
    //     $('#dietbutton').click(function() {
    //         $('#foodresult').toggle();
    //         alert("called");
    //         // $('#piechart').append("<canvas id="foodpiechart"></canvas>");
    //     });
    // }
    // );
	}
	function check(index){
		muri=muriArray[index+1];
	}
	function display(fid) { 
        if(muri==null) muri=muriArray[0];
    if (suri !== null) {
        var food = {
            ingredients: [
                {
                    "quantity": 1,
                    "measureURI": muri,
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
                    "measureURI": muri,
                    "foodId": fid
                }
            ]
        };
    }
    //alert(muri);
    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        url: "https://api.edamam.com/api/food-database/nutrients?app_id=a6471d58&app_key=1371084639e0deae5ca2cae1f0b8a534",
        data: JSON.stringify(food),
        success: function (data) {
            $("#facts").empty();
            $("#foodname").val(data.ingredients[0].parsed[0].food);
            var num=$("#num").val();
            var check = data.totalNutrients;
			$("#calories").text(check.ENERC_KCAL.quantity + check.ENERC_KCAL.unit);
			$("#protein").text(check.PROCNT.quantity + check.PROCNT.unit);
			$("#fats").text(check.FAT.quantity + check.FAT.unit);
			$("#carbs").text(check.CHOCDF.quantity + check.CHOCDF.unit);
        }
    });
}