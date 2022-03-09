
function posting() {
            let file = $('#file')[0].files[0];
            let title = $('#title').val();
            let address = $('#address').val();
            let comment = $('#comment').val();
            let star = $('#star').val();
            let tag = $('#tag').val();


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

        // 첨부한 파일을 미리보는 기능을 제공
        function preview(input) {
            let imgfile = input.files;
            let filetype = imgfile[0].type.split('/').pop().toLowerCase();

            if (imgfile && imgfile[0]) {
                let reader = new FileReader();
                reader.onload = function (e) {
                    if ($.inArray(filetype, ['jpg', 'jpeg', 'png', 'gif']) == -1) {
                        alert('jpg, jpeg, png, gif 파일만 업로드 해주세요!');
                        $('#img-preview').attr('src', `../static/image/noimage.gif`);
                        $('#posting-btn').attr('disabled', true);
                        return;
                    }
                    $('#img-preview').attr('src', e.target.result);
                    $('#posting-btn').removeAttr('disabled');
                };
                reader.readAsDataURL(input.file[0]);
            }
        }