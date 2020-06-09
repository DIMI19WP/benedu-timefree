let err = 0
const repeater = async () => {
  try {
    await (await fetch('/StudentHome')).text()
    console.log('정상적으로 시간이 초기화되었습니다')
  } catch (e) {
    alert('시간을 초기화하는데 문제가 발생했습니다.')
    err++
  }
}

setInterval(() => !err && repeater(), 10 * 60 * 1000)