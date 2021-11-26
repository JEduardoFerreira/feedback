function format(pattern, string) {
    pattern = pattern.toString();
    string = string.toString();
    for(let i=pattern.length-string.length; i > 0; i--){
        string = '#' + string;
    }
    let ntext = '';
    for(let i=pattern.length-1; i >= 0; i--){
        if (string[i] == '#'){
            ntext = pattern[i] + ntext;
        }else{
            ntext = string[i] + ntext;
        }
    }
    return ntext;
}

function getNomeMes(mes) {
	mes = format('00', mes);
	let meses = {'01': 'Janeiro', '02': 'Fevereiro', '03': 'Março', '04': 'Abril', '05': 'Maio', '06': 'Junho', '07': 'Julho', '08': 'Agosto', '09': 'Setembro', '10': 'Outubro', '11': 'Novembro', '12': 'Dezembro'};
	return meses[mes];	
}

function dataExtenso(dateTime){
	if (dateTime.length == 10){
        dateTime += ' 00:00:00';
	}
	let dth = dateTime.split(" ");
    let dt  = dth[0].split("-");
    let dh  = dth[1].split(":");
    return `${dt[2]} de ${getNomeMes(format('00', dt[1]))} de ${dt[0]} às ${dh[0]}:${dh[1]}`
}

$('document').ready(()=> {
    document.querySelectorAll('.blockquote-footer>cite:nth-child(2)').forEach((elem) => {
        elem.innerText = dataExtenso(elem.innerText);
    });
});

$("#container-avaliacoes").on('click', '.vis-ava, .edt-ava, .exc-ava', event => {
    event.preventDefault();
    debugger;
    let elem = event.currentTarget;
    let target = elem.getAttribute('to-ref');
    window.location.href = target;    
});