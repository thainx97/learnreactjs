//22♥️♥️♥️
let  a = [1,2,3,4,5,6,7,8,9,9,8,7,6,5,4,3,2,1];
console.log("Max: ", Math.max(...a)); //max
console.log("Min: ", Math.min(...a)); //min
let sum = 0; //TBC
for (let i = 0; i < a.length; i++) {
    sum += a[i];
}
console.log("TBC: ", sum/a.length);

//23♥️♥️♥️
const arr1=[1,2,3,4,5,6,7,8,9,9,9,8,7,6,5,4,3,2,1];
let fmax = 1; // tần số của số xuất hiện nhiều nhất
let fi = 0; // tần số của một số trong mảng
let item;
for (let i=0; i<arr1.length; i++)
{
    for (let j=i; j<arr1.length; j++)
    {
        if (arr1[i] == arr1[j])
         fi++;
        if (fmax < fi)
        {
          fmax = fi; 
          item = arr1[i];
        }
    }
    fi=0;
}
console.log('Số', item, 'xuất hiện', fmax, 'lần' ) ;


//24♥️♥️♥️
let b = [1,2,3,2,3,4,6,7];
function checkNT(number) {
    flag = true;
    if(number < 2) {
        flag = false;
    } else if (number === 2) {
        flag = true;
    }
     else {
        for (let i = 2; i < Math.sqrt(number) + 1; i++) {
            if(number % i == 0) {
                flag = false;
                break;
            } 
        }
    }
    return flag;
}
// console.log(checkNT(51));

let prime = b.filter(number => {
    return checkNT(number);
})
console.log('số nguyên tố: ', prime);
//25♥️♥️♥️
let c =  [1,2,3,2,3,4,6,7];
console.log("Mang binh phuong: ", c.map(number => number * number));

//26♥️♥️♥️
let numbers = [1,2,3,4,6,7];
let k = 9;
let arrs = numbers.map(number => Math.abs((number - k)));// tính khoảng cách tuyệt đối với k
let idx = arrs.map((arr, i) => arr === Math.min(...arrs) ? i : -1).filter(index => index !== -1);// lấy ra index của khoảng cách min
let nearestK = [];
for(let i = 0; i < idx.length; i++) {
    nearestK.push(numbers[idx[i]]);
}
console.log("Số gần K nhất là: ", nearestK)

//27♥️♥️♥️
students = [
    {
        id: "T3HXX1",
        firstName: "NgAn",
        lastName: "Duong Thuy"
    },
    {
        id: "T3HXX2",
        firstName: "Ha",
        lastName: "Do Thi Thu"
    },
    {
        id: "T3HXX5",
        firstName: "Minh",
        lastName: "Nguyen Nhat"
    }
]
// chuyển tên và họ về viết hoa kí tự đầu
function chuanHoaHoTen(val) {
    let convertToArray = val.toLowerCase().split(' ');
    let result = convertToArray.map(word => {
       return word.charAt(0).toUpperCase() + word.slice(1);
    })
    return result.join(' ');
}
let studentUcFirstNames = students.map((student, index) => {
    return student.firstName = chuanHoaHoTen(students[index].firstName);
})
let studentUcLastNames = students.map((student, index) => {
    return student.lastName = chuanHoaHoTen(students[index].lastName);
})
console.log('chuẩn hóa tên: ', students);
// trả về học viên có tên tồn tại chữ cái “a” hoặc “A” và tên dài hơn hoặc bằng 3 ký tự.
let studentA = students.filter(student => {
    return student.firstName.toLowerCase().indexOf('a') != -1 && student.firstName.length >= 3;// do a = A.toLowerCase()
})
console.log('học sinh có chữ a trong tên: ', studentA);

//28♥️♥️♥️ trả về học sinh cá biệt có họ là “Do”
let studentDo = students.filter(student => {
    return student.lastName.split(' ')[0].indexOf('Do') != -1;    
})
console.log('học sinh có họ Do', studentDo);

//29♥️♥️♥️ sắp xếp mảng theo bảng chữ cái của firstName
