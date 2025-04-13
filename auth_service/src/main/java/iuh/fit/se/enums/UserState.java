package iuh.fit.se.enums;

import lombok.Getter;

@Getter
public enum UserState {
    ACTIVE("Active"),
    INACTIVE("Inactive"),
    BANNED("Banned");

    private String state;

    UserState(String state) {
        this.state = state;
    }

}
