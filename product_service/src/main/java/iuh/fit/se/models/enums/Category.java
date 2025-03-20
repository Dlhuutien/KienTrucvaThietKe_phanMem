package iuh.fit.se.models.enums;

public enum Category {
	PHONE("Phone"),
    POWER_BANK("Power Bank"),
    CHARGING_CABLE("Charging Cable"),
    EARPHONE("Earphone");

    private final String categoryName;

    Category(String categoryName) {
        this.categoryName = categoryName;
    }

    public String getCategoryName() {
        return categoryName;
    }

}
