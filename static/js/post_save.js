function posting() {
    let file = $('#file')[0].files[0];
    let title = $('#title').val();
    let address = $('#address').val();
    let comment = $('#comment').val();
    let star = $('#star').val();
    let tag = $('#tag').val();
    let today = new Date().toISOString();


    if (file == '') {
        alert('파일을 추가해 주세요!');
        return;
    } else if (title == '') {
        alert('가게명을 추가해 주세요!');
        $('#title').focus();
        return;
    } else if (address == '') {
        alert('주소를 추가해 주세요!');
        $('#address').focus();
        return;
    } else if (comment == '') {
        alert('코멘트를 추가해 주세요!');
        $('#comment').focus();
        return;
    } else if (star == '') {
        alert('별점을 추가해 주세요!');
        $('#star').focus();
        return;
    } else if (tag == '') {
        alert('태그를 추가해 주세요!');
        $('#tag').focus();
        return;
    }

    let form_data = new FormData();
    form_data.append('file_give', file);
    form_data.append('title_give', title);
    form_data.append('address_give', address);
    form_data.append('comment_give', comment);
    form_data.append('star_give', star);
    form_data.append('tag_give', tag);
    form_data.append('date_give',today);


    $.ajax({
        type: 'POST',
        url: '/api/post_save',
        data: form_data,
        cache: false,
        contentType: false,
        processData: false,
        success: function (response) {
            alert(response['msg']);
            window.location.href = '/';
        },
    });
}


// 업로드한 이미지 파일 미리보기
function readURL(input){
    if (input.files && input.files[0]){
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#blah').attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
}
