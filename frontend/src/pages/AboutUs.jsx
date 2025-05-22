import React from 'react'
import { Box, Typography } from '@mui/material'
import banner_1 from '../assets/banner_1.jpg'
import banner_2 from '../assets/banner_2.png'
const AboutUs = () => {
  return (
    <Box>
        <Typography
            variant='h4'
            fontWeight={700}
            mt={2}
            sx={{
                marginLeft: '40%'
            }}
        >
            GIỚI THIỆU
        </Typography>
        <Box p={5}>
            <Typography
                variant='h6'
                fontWeight={600}
            >
                Khám phá thế giới công nghệ với các mẫu điện thoại đẳng cấp
            </Typography>
            <Typography
                variant='body1'
                mt={2}
            >
                Chào mừng bạn đến với cửa hàng của chúng tôi, nơi hội tụ những mẫu điện thoại di động chất lượng nhất từ các thương hiệu hàng đầu thế giới. Với thiết kế hiện đại, tính năng đột phá và hiệu suất mạnh mẽ, các sản phẩm tại đây không chỉ đáp ứng nhu cầu cơ bản mà còn nâng tầm trải nghiệm của bạn trong từng khoảnh khắc. Hãy chọn cho mình một chiếc điện thoại phù hợp, từ các mẫu giá rẻ đến dòng cao cấp, để kết nối, sáng tạo và tận hưởng cuộc sống số một cách trọn vẹn nhất.
            </Typography>
            <br/>
            <Typography
                variant='body1'
            >
                Chúng tôi hiểu rằng mỗi người đều có nhu cầu và phong cách riêng khi sử dụng điện thoại. Vì vậy, bộ sưu tập của chúng tôi bao gồm đầy đủ các lựa chọn từ những mẫu điện thoại giá rẻ phù hợp với túi tiền đến những dòng cao cấp sang trọng với các tính năng tiên tiến. Hãy để chúng tôi giúp bạn chọn ra sản phẩm hoàn hảo để kết nối, sáng tạo và tận hưởng cuộc sống số một cách trọn vẹn nhất.
            </Typography>
            <img src={banner_1} alt="" style={{width: '100%', height: '400px', marginTop: '20px'}}/>
        </Box>
        <Box p={5}>
            <Typography
                variant='h6'
                fontWeight={600}
            >
                Sản phẩm chính hãng, chất lượng uy tín
            </Typography>
            <Typography
                variant='body1'
                mt={2}
            >
                Cửa hàng của chúng tôi cam kết cung cấp sản phẩm chính hãng với dịch vụ tận tâm, đáp ứng mọi nhu cầu của khách hàng. Không chỉ cung cấp những chiếc điện thoại đa dạng về kiểu dáng và cấu hình, chúng tôi còn mang đến các chính sách bảo hành uy tín, hỗ trợ kỹ thuật nhanh chóng và đảm bảo chất lượng tuyệt đối. Hãy để chúng tôi đồng hành cùng bạn trên con đường khám phá thế giới số, với những sản phẩm đáng tin cậy và phù hợp với phong cách của bạn.
            </Typography>
            <br/>
            <Typography
                variant='h6'
                fontWeight={600}
            >
                Sự an tâm và tiện lợi khi mua sắm
            </Typography>
            <Typography
                variant='body1'
                mt={2}
            >
                Không chỉ mang đến sản phẩm chất lượng, chúng tôi còn cam kết đem đến dịch vụ hỗ trợ khách hàng tận tâm và chính sách bảo hành uy tín. Với đội ngũ tư vấn chuyên nghiệp, sẵn sàng giải đáp mọi thắc mắc của bạn, chúng tôi đảm bảo trải nghiệm mua sắm sẽ thật sự tiện lợi và thoải mái. Cùng khám phá và lựa chọn chiếc điện thoại yêu thích ngay hôm nay để không bỏ lỡ bất kỳ điều gì thú vị mà công nghệ mang lại.
            </Typography>
            <img src={banner_2} alt="" style={{width: '100%', height: '400px', marginTop: '20px'}}/>
        </Box>
    </Box>
  )
}

export default AboutUs