// import React, { useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import axios from 'axios';

// const PaymentSuccess = () => {
//     const [paymentDetails, setPaymentDetails] = useState(null);
//     const [error, setError] = useState(null);
//     const location = useLocation();

//     const formatCurrency = (value) => {
//         return new Intl.NumberFormat('vi-VN', {
//             style: 'currency',
//             currency: 'VND',
//         }).format(value);
//     };

//     useEffect(() => {
//         const sessionId = new URLSearchParams(location.search).get('session_id');
//         if (sessionId) {
//             axios.get(`http://localhost:8000/payment/status?sessionId=${sessionId}`)
//                 .then(response => {
//                     setPaymentDetails(response.data.data);
//                 })
//                 .catch(error => {
//                     console.error('Error fetching payment status:', error);
//                     setError('Không thể tải thông tin thanh toán');
//                 });
//         }
//     }, [location]);

//     return (
//         <div style={{ padding: '20px', textAlign: 'center' }}>
//             <h1>Thanh toán thành công!</h1>
//             {error && <p style={{ color: 'red' }}>{error}</p>}
//             {paymentDetails ? (
//                 <div>
//                     <p><strong>Trạng thái:</strong> {paymentDetails.status}</p>
//                     <p><strong>Số tiền:</strong> {formatCurrency(paymentDetails.amount)}</p>
//                     <p><strong>Thời gian hoàn thành:</strong> {paymentDetails.completedTime || 'N/A'}</p>
//                     <a href="/">Quay lại trang chủ</a>
//                 </div>
//             ) : (
//                 <p>Đang tải thông tin thanh toán...</p>
//             )}
//         </div>
//     );
// };

// export default PaymentSuccess;

import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const PaymentSuccess = () => {
    const [paymentDetails, setPaymentDetails] = useState(null);
    const [error, setError] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(value);
    };

    useEffect(() => {
        const sessionId = new URLSearchParams(location.search).get('session_id');
        if (sessionId) {
            axios.get(`http://localhost:8000/payment/status?sessionId=${sessionId}`)
                .then(async (response) => {
                    const data = response.data.data;
                    setPaymentDetails(data);

                    if (data.status === 'PENDING') {
                        // Nếu đang ở trạng thái chờ -> gọi complete
                        await axios.post(`http://localhost:8000/payment/complete`, null, {
                            params: {
                                sessionId: sessionId,
                                status: 'COMPLETED'
                            }
                        });
                        console.log('Đã hoàn tất cập nhật trạng thái thanh toán.');
                    }
                })
                .catch(error => {
                    console.error('Error fetching payment status:', error);
                    setError('Không thể tải thông tin thanh toán');
                });
        }
    }, [location]);

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <h1>Thanh toán thành công!</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {paymentDetails ? (
                <div>
                    <p><strong>Trạng thái:</strong> {paymentDetails.status}</p>
                    <p><strong>Số tiền:</strong> {formatCurrency(paymentDetails.amount)}</p>
                    <p><strong>Thời gian hoàn thành:</strong> {paymentDetails.completedTime || 'N/A'}</p>
                    <button onClick={() => navigate('/order-history')}>Lịch sử</button>
                </div>
            ) : (
                <p>Đang tải thông tin thanh toán...</p>
            )}
        </div>
    );
};

export default PaymentSuccess;
