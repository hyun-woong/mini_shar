function toggle_like(post_id, type) {
    console.log(post_id, type)
    let $a_like = $(`#${post_id} a[aria-label='heart']`)
    let $i_like = $a_like.find("i")
    if ($i_like.hasClass("fa-heart")) {
        $.ajax({
            type: "POST",
            url: "/update_like",
            data: {
                post_id_give: post_id,
                type_give: type,
                action_give: "unlike"
            },
            success: function (response) {
                console.log("unlike")
                $i_like.addClass("fa-heart-o").removeClass("fa-heart")
                $a_like.find("span.like-num").text(num2str(response["count"]))
            }
        })
    } else {
        $.ajax({
            type: "POST",
            url: "/update_like",
            data: {
                post_id_give: post_id,
                type_give: type,
                action_give: "like"
            },
            success: function (response) {
                console.log("like")
                $i_like.addClass("fa-heart").removeClass("fa-heart-o")
                $a_like.find("span.like-num").text(num2str(response["count"]))
            }
        })

    }
}

function post() {
    let comment = $("#textarea-post").val()
    let today = new Date().toISOString()
    $.ajax({
        type: "POST",
        url: "/posting",
        data: {
            comment_give: comment,
            date_give: today
        },
        success: function (response) {
            $("#modal-post").removeClass("is-active")
            window.location.reload()
        }
    })
}

// 포스팅 시간 나타내기

function time2str(date) {
    let today = new Date()
    let time = (today - date) / 1000 / 60  // 분

    if (time < 60) {
        return parseInt(time) + "분 전"
    }
    time = time / 60  // 시간
    if (time < 24) {
        return parseInt(time) + "시간 전"
    }
    time = time / 24
    if (time < 7) {
        return parseInt(time) + "일 전"
    }
    // return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`
}

// 좋아요 숫자 형식
function num2str(count) {
    if (count > 10000) {
        return parseInt(count / 1000) + "k"
    }
    if (count > 500) {
        return parseInt(count / 100) / 10 + "k"
    }
    if (count == 0) {
        return "0"
    }
    return count
}

// 포스팅 카드 만들기

function get_posts(username) {
    if (username == undefined) {
        username = ""
    }
    $("#post-box").empty()
    $.ajax({
        type: "GET",
        url: `/get_posts?username_give=${username}`,
        data: {},
        success: function (response) {
            if (response["result"] == "success") {
                console.log(response)
                let posts = response["posts"]
                for (let i = 0; i < posts.length; i++) {
                    let post = posts[i]
                    let file = posts[i]['post_file']
                    let time_post = new Date(post["date"])
                    let time_before = time2str(time_post)
                    let class_heart = post['heart_by_me'] ? "fa-heart" : "fa-heart-o"
                    let count_heart = post['count_heart']
                    const file_url = "/static/image/"
                    let html_temp = `<div class="box" id="${post["_id"]}">
                                        <article class="media">

                                            <div class="media-content">
                                                <div class="content">
                                                    <p>
                                                        <strong>${post['username']}</strong> <small>@${post['username']}</small> 
                                                        <br>
                                                    <small>${post['post_title']}</small></p>
                                                </div>
                                                <div class="media-left">
                                                <a class="image is-128x128" href="#">
                                                    <img class="is-square"
                                                         src="/static/image/${file}" alt="Image">
                                                </a>
                                                </div>
                                                <p><small>평가:</small> <small>${post['post_star']}</small><br> 
                                                <small>주소:</small> <small>${post['post_address']}</small> </p>
                                            </div>
 
                                            <div class="media-content">
<<<<<<< HEAD
                                                <div>     
                                                        ${post['post_comment']}
=======
                                                <div class="get_card" style="font-family: 'Jua', sans-serif;font-size: medium;">    
                                                    <span>${post['post_comment']}</span>
>>>>>>> c0bb1e70ea8af0d2d921224e29c5564af45e25b2
                                                </div>
                                            </div>
                                            <div class="media-right">
                                                <div class="content">
                                                    <small>${time_before}</small>
                                                    <!-- 좋아요 -->
                                                     <nav class="level is-mobile">
                                                        <div class="level-left">
                                                            <a class="level-item is-sparta" aria-label="heart" onclick="toggle_like('${post['_id']}', 'heart')">
                                                                <span class="icon is-small"><i class="fa ${class_heart}"
                                                                                               aria-hidden="true"></i></span>❤️<span class="like-num">${num2str(count_heart)}</span>
                                                            </a>
                                                        </div>
                                                    </nav>
                                                </div>
                                            </div>
                                            
                                        </article>
                                    </div>`
                    $("#post-box").append(html_temp)
                }
            }
        }
    })
}

// 로그아웃
function sign_out() {
    $.removeCookie('mytoken', {path: '/'});
    alert('로그아웃!')
    window.location.href = "login"
}