package iuh.fit.se.models.enums;

public enum OS {
	ANDROID("Android"), 
	IOS("iOS");

	private final String name;

	OS(String name) {
		this.name = name;
	}

	public String getName() {
		return name;
	}

}
