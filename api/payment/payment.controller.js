const paymentService = require('./payment.service');
const config = require('../../config');
const { commonResponse, guards, message } = require('../../helpers');
var Iyzipay = require('iyzipay');
var iyzipay = new Iyzipay(config.iyzicoConfig);
const cryptoRandomString = require('crypto-random-string');


exports.createPayment = async (req, res) => {
    try {
        const userData = await sqConn.Student.findStudentDetails(req.body.userId);
        const data = req.body;
        if (userData) {
            const paymentData = {
                locale: "en",
                price: data.price,
                paidPrice: data.price * 2,
                installment: 1,
                paymentChannel: "WEB",
                paymentCard: {
                    cardHolderName: data.cardHolderName,
                    cardNumber: data.cardNumber,
                    expireYear: data.expireYear,
                    expireMonth: data.expireMonth,
                    cvc: data.cvc
                },
                buyer: {
                    id: data.userId,
                    name: userData.firstName,
                    surname: userData.lastName,
                    identityNumber: cryptoRandomString({ length: 11, type: 'numeric' }),
                    email: userData.email,
                    registrationAddress: "Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1",
                    city: userData.city + "",
                    country: userData.country + "",
                    ip: "85.34.78.112"
                },
                shippingAddress: {
                    address: "Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1",
                    contactName: userData.firstName + ' ' + userData.lastName,
                    city: userData.city + "",
                    country: userData.country + "",
                },
                billingAddress: {
                    address: "Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1",
                    contactName: userData.firstName + ' ' + userData.lastName,
                    city: userData.city + "",
                    country: userData.country + "",
                },
                basketItems: data.basketItems,
                currency: "TRY"

            }
            iyzipay.payment.create(paymentData, async (err, result) => {
                if (err) {
                    return commonResponse.failure(res, message.DEFAULTERR);
                }
                if (result && result.status == 'success') {
                    let counter = 0;
                    for (let item of result.itemTransactions) {
                        let tData = {
                            tutor_id: data.tutor_id,
                            student_id: userData.student_id,
                            session_id: data.session_id,
                            slot_id: data.slot_id,
                            price: item.price,
                            transaction_Id: item.paymentTransactionId,
                            paymentStatus: item.transactionStatus === 2 ? 'paid' : 'pending'
                        }
                        const paymentTableInfo = await sqConn.StudentPayment.addTransaction(tData);
                        counter = counter + 1;
                        if (!paymentTableInfo) {
                            return commonResponse.failure(res, message.DEFAULTERR);
                        }
                    }
                    if (counter == result.itemTransactions.length) {
                        return commonResponse.success(res, {}, message.DEFAULT);
                    }

                } else {
                    return commonResponse.failure(res, message.DEFAULTERR);
                }
            });

        } else {
            return commonResponse.failure(res, message.DEFAULTERR);
        }

    } catch (error) {
        return commonResponse.sendUnexpected(res, error);
    }
};

exports.refundPay = async (req, res) => {
    try {
        // iyzipay.refund.create(req.body, function (err, result) {
        // 	if (err) {
        // 		return commonResponse.failure(res, err);
        // 	}
        // 	return commonResponse.success(res, result, message.DEFAULT);
        // });
    } catch (error) {
        return commonResponse.sendUnexpected(res, error);
    }
};



