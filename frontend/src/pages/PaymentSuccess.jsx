import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const PaymentSuccess = () => {
    const [paymentDetails, setPaymentDetails] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(value);
    };

    useEffect(() => {
        const fetchPaymentStatus = async () => {
            try {
                // Lấy session_id từ URL
                const sessionId = new URLSearchParams(location.search).get('session_id');

                if (!sessionId) {
                    setError('Không tìm thấy mã thanh toán');
                    setLoading(false);
                    return;
                }

                console.log('Kiểm tra trạng thái thanh toán cho session:', sessionId);

                // Tự động hoàn tất thanh toán
                try {
                    await axios.post(`https://api-gateway-ow6h.onrender.com/payment/complete`, null, {
                        params: {
                            sessionId: sessionId,
                            status: 'COMPLETED'
                        }
                    });
                    console.log('Đã cập nhật trạng thái thanh toán thành COMPLETED');
                } catch (updateError) {
                    console.error('Lỗi khi cập nhật trạng thái thanh toán:', updateError);
                }

                // Sau đó lấy thông tin thanh toán
                const response = await axios.get(`https://api-gateway-ow6h.onrender.com/payment/status?sessionId=${sessionId}`);
                setPaymentDetails(response.data.data);
            } catch (error) {
                console.error('Lỗi khi kiểm tra trạng thái thanh toán:', error);
                setError('Không thể tải thông tin thanh toán. Vui lòng liên hệ hỗ trợ.');
            } finally {
                setLoading(false);
            }
        };

        fetchPaymentStatus();
    }, [location]);

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <h1>Thanh toán thành công!</h1>
            {loading && <p>Đang xử lý thanh toán của bạn...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {!loading && !error && paymentDetails && (
                <div>
                    <p><strong>Trạng thái:</strong> {paymentDetails.status}</p>
                    <p><strong>Số tiền:</strong> {formatCurrency(paymentDetails.amount)}</p>
                    <p><strong>Thời gian hoàn thành:</strong> {paymentDetails.completedTime || 'N/A'}</p>
                    <button
                        onClick={() => navigate('/')}
                        style={{
                            padding: '10px 20px',
                            backgroundColor: '#4a5395',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            marginRight: '10px',
                            cursor: 'pointer'
                        }}
                    >
                        Trang chủ
                    </button>
                    <button
                        onClick={() => navigate('/order-history')}
                        style={{
                            padding: '10px 20px',
                            backgroundColor: '#33CCFF',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer'
                        }}
                    >
                        Xem lịch sử đơn hàng
                    </button>
                </div>
            )}
        </div>
    );
};

export default PaymentSuccess;