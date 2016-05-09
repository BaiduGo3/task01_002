function Table(){
}
Table.prototype.init = function(){
	var tbody = document.getElementsByTagName("tbody")[0];
	tbody.innerHTML = "";
	var content = "";
	for(var i = 0; i <= 10; i++){
		content += "<tr>";
		for(var j = 0; j <= 10; j++){
			if(i == 0 && j != 0){
				content += "<td>" + j + "</td>";
			}else if(i != 0 && j == 0){
				content += "<td>" + i + "</td>";
			}else{
				content += "<td></td>";
			}
		}
		content += "</tr>";
	}
	tbody.innerHTML = content;
}