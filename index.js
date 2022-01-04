// Your code here
function createEmployeeRecord(arr){
    let employee = {
        'firstName' : arr[0],
        'familyName' : arr[1],
        'title' : arr[2],
        'payPerHour' : arr[3],
        'timeInEvents': [],
        'timeOutEvents': [] 
    }
    return employee;
}


function createEmployeeRecords(arrOfArrays){
    let employeeRecords = []
    arrOfArrays.forEach(arr => {
       let employeeObj = createEmployeeRecord(arr)
       employeeRecords.push(employeeObj)
    })
    return employeeRecords;
}

function createTimeInEvent(employeeObj, dateInStamp){
    let newEvent = {
      'type' : 'TimeIn',
      'date' : dateInStamp.slice(0, 10),
      'hour' : parseInt(dateInStamp.slice(-4))
    }
    employeeObj.timeInEvents.push(newEvent)
    return  employeeObj
  }

    function createTimeOutEvent(employeeObj, dateOutStamp){
      let newEvent = {
        'type' : 'TimeOut',
        'date' : dateOutStamp.slice(0, 10),
        'hour' : parseInt(dateOutStamp.slice(-4))
      }
      employeeObj.timeOutEvents.push(newEvent)
      return employeeObj 
    }

  function hoursWorkedOnDate(employeeObj, date){
    let start = employeeObj.timeInEvents.find(event => event.date === date)
    let finish = employeeObj.timeOutEvents.find(event => event.date === date)

    let hours = (finish['hour'] - start['hour'])/100
    return hours
  } 

  function wagesEarnedOnDate(employeeObj, date){
      let hours = hoursWorkedOnDate(employeeObj, date)
      let payOwed = employeeObj.payPerHour * hours
      return payOwed
  }

  function allWagesFor(employeeObj){
    let allWages = 0;
    employeeObj.timeInEvents.forEach(day => {
      let owed = wagesEarnedOnDate(employeeObj, day.date)
      allWages += owed
    })
    return allWages
    }


function calculatePayroll(array){
    let payroll = 0
    array.forEach(employee => {
        let allWages = allWagesFor(employee)
        payroll += allWages
    })
    return payroll;
}