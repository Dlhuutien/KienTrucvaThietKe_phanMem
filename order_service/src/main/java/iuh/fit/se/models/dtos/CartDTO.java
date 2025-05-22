package iuh.fit.se.models.dtos;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import iuh.fit.se.models.enums.State;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CartDTO implements Serializable {
    private static final long serialVersionUID = 1L;
    private int cartId;
    private int id;
    private int userId;
    private List<CartDetailDTO> cartDetails;
    private LocalDateTime createdTime;
    private LocalDateTime modifiedTime;
    private State state;
    private BigDecimal totalDue;
}
