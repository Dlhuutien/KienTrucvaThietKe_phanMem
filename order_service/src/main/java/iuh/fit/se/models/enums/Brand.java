package iuh.fit.se.models.enums;

public enum Brand {
	APPLE("Apple"), 
	SAMSUNG("Samsung"), 
	HUAWEI("Huawei"), 
	XIAOMI("Xiaomi"), 
	GOOGLE("Google"), 
	ONEPLUS("OnePlus"),
	NOKIA("Nokia"), 
	SONY("Sony"), 
	OPPO("Oppo"), 
	VIVO("Vivo");

	private final String brandName;

	Brand(String brandName) {
		this.brandName = brandName;
	}

	public String getBrandName() {
		return brandName;
	}

}
