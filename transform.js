const { vacationArray } = require('./data')
const transform = (initialArray) => {
  //1.Найти уникальные имена сотрудников в списке
  const uniquesValues = []

  initialArray.forEach((el) => {
    if (uniquesValues.indexOf(el.user.name) == -1) {
      uniquesValues.push(el.user.name)
    }
  })

  //2.Сделать шаблон финального обьекта для каждого сотрудника

  const draftObject = {}

  uniquesValues.forEach((el) => {
    draftObject[el] = {
      userId: '',
      name: '',
      weekendDates: [],
    }
  })

  /*3.Пройтись но всему изначальному масиву отпусков(initialArray) 
и по уникальному значению имени сотрудника добавить в draftObject значения отпусков в массив weekendDates
*/
  initialArray.forEach((el) => {
    if (draftObject[el.user.name].userId === '') {
      draftObject[el.user.name].userId = el.user._id
      draftObject[el.user.name].name = el.user.name
      draftObject[el.user.name].weekendDates.push({
        startDate: el.startDate,
        endDate: el.endDate,
      })
    } else {
      draftObject[el.user.name].weekendDates.push({
        startDate: el.startDate,
        endDate: el.endDate,
      })
    }
  })

  //4.превратить в масив обьектов
  const finalArray = []

  for (const [key, value] of Object.entries(draftObject)) {
    finalArray.push(value)
  }

  return finalArray
}

console.log(transform(vacationArray))
