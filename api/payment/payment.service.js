
var message = require('../../helpers/message');
var config = require('../../config');
var guards = require('../../helpers/guards');
const Sequelize = require('sequelize');


// exports.createPayment = async (data, userData) => {



//     iyzipay.payment.create(paymentData, async (err, result) {
//         if (err) {
//             console.log("Err", err);
//             // return { success: false, message: message.DEFAULTERR };
//         }
//         if (result && result.status == 'success') {
//             let counter = 0;
//             for (let item of result.itemTransactions) {
//                 let tData = {
//                     tutor_id: data.tutor_id,
//                     student_id: userData.student_id,
//                     session_id: data.session_id,
//                     slot_id: data.slot_id,
//                     price: item.price,
//                     transaction_Id: item.paymentTransactionId,
//                     paymentStatus: item.transactionStatus === 2 ? 'paid' : 'pending'
//                 }
//                 const paymentTableInfo = await sqConn.StudentPayment.addTransaction(tData);
//                 counter = counter + 1;
//                 // console.log("cc", counter, result.itemTransactions.length);
//                 if (!paymentTableInfo) {
//                     // return { success: false, message: message.DEFAULTERR };
//                 }
//             }
//           if (counter == result.itemTransactions.length) {
//               console.log("done");
//             //   return { success: true, data: result, message: 'Payment Done Successfully' };
//         }
  

//             // result.itemTransactions.forEach(async (item) => {
//             //     let tData = {
//             //         tutor_id: data.tutor_id,
//             //         student_id: userData.student_id,
//             //         session_id: data.session_id,
//             //         slot_id: data.slot_id,
//             //         price: item.price,
//             //         transaction_Id: item.paymentTransactionId,
//             //         paymentStatus: item.transactionStatus === 2 ? 'paid' : 'pending'
//             //     }
//             //     const paymentTableInfo = await sqConn.StudentPayment.addTransaction(tData);
//             //     counter = counter+1;
//             //     console.log("cc",counter,result.itemTransactions.length);
//             //     if(!paymentTableInfo){
//             //         return { success: false, message: message.DEFAULTERR };
//             //     }
//             // })
//             // if (counter == result.itemTransactions.length) {
//             //     console.log("Res", result);
//             //     return { success: true, data: result, message: 'Payment Done Successfully' };
//             // }
//         } else {
//             // return { success: false, message: result.errorMessage };
//         }
//     });

//     // if (paymentInfo) {
//     //     return  { success: true, data: paymentInfo, message: message.DEFAULT };
//     // } else {
//     //     return { success: false, message: message.DEFAULTERR };
//     // }

// };



