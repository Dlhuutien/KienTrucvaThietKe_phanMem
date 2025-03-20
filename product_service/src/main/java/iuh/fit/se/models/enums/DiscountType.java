package iuh.fit.se.models.enums;

public enum DiscountType {
	PRODUCT("Discount on Product"), 
	CATEGORY("Discount on Category"), 
	BRAND("Discount on Brand");

	private final String displayName;

	DiscountType(String displayName) {
		this.displayName = displayName;
	}

	public String getDisplayName() {
		return displayName;
	}

}
