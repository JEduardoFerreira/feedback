function getAlunos(){
    $.ajax({
        type: "GET",
        data: {},
        url: "http://127.0.0.1:3000/api/alunos",
        dataType: "json",
        success: function(data){
            //$(".carregando").css("display","none");
            if (data.length > 0){
                preencheAlunos(data);
            }
        },
        timeout: function(msg){
        },
        fail: function(msg){
        },
        beforeSend: function(msg){
        },
        complete: function(msg){
        },
        error: function(msg){
        }
    });
}

function preencheAlunos(alunos){
    let html = '';
    alunos.forEach(a => {
        html += `<ol>${a.nome}, tem ${a.idade} anos de idade.</ol>`
    });
    document.querySelector('#lista_alunos').innerHTML = html;
}