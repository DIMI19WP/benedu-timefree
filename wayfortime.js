function injectionScript(){
    const [separatedMin, separatedSec] = document.querySelector("#main-container > div.main-content > div > div.page-content > div > div > div:nth-child(3) > div > div.table-header.bolder > span.badge.pull-right").innerHTML.split(' ')[19].split(':')
    const computedMinSec = ((+separatedMin) * 60 + +separatedSec)

    function shouldWait() {
        const timer = +(document.getElementById('TEST_ELAPSED_TIME').value)
        if(isNaN(timer)) return false;
        return timer < computedMinSec
    }

    // mock function
    function SaveTest(answerData) {
        var url = "/StudentStudy/TestSaveNext";
        if(shouldWait()) {
            beneduAlertOkWarning('아직 최소풀이시간을 넘지 않았습니다.');
            return
        }
        $.ajax({
            url: url,
            data: {
                inputData : answerData,
                beginData : $("#IBU_BEGIN_DATE").val(),
                beginTime : $("#IBU_BEGIN_TIME").val()
            },
            type: 'POST',            
            success: function (data) {
                if (data.item.RESULT < 0) {
                    beneduAlertOkWarning('답안을 제출하는 과정에서 오류가 발생하였습니다.');
                    return false;
                } else if (data.item.RESULT = 0) {
                    beneduAlertOkWarning('답안 데이터가 바르지 않아 답안을 제출을 실패하였습니다.');
                    return false;
                }

                gotoResult();
                    
                return;
            }
        });
    }
}

const injector = document.createElement('script')
injector.innerHTML = injectionScript.toString().slice(27, -1)
document.body.appendChild(injector)