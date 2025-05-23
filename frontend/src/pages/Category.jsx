import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Collapse,
  Grid2,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Slider,
  Typography,
} from "@mui/material";
import Item from "../component/Item";
import { useEffect, useState } from "react";
import {
  listCableByFilter,
  listEarPhoneByFilter,
  listPhoneByFilter,
  listPowerBankByFilter,
  listProductBySearchTerm,
  searchProductByCategory,
  searchProductNewest,
  searchProductSale,
} from "../services/ProductService";
import CableIcon from "@mui/icons-material/Cable";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import PhoneIcon from "@mui/icons-material/Smartphone";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Newspaper } from "@mui/icons-material";

const Category = () => {
  //data for filter
  const [data, setData] = useState([]);
  const [products, setProduct] = useState([]);
  const [productsNewest, setProductsNewest] = useState([]);
  const [productsSale, setProductsSale] = useState([]);
  const [productsCategory, setProductsCategory] = useState([]);
  const [ramList, setRamList] = useState([]);
  const [romList, setRomList] = useState([]);
  const [chipList, setChipList] = useState([]);

  //data for filter earPhone
  const [connectTypeList, setConnectTypeList] = useState([]);
  const [brandList, setBrandList] = useState([]);
  const [other, setOther] = useState([]);

  //
  const [openCable, setOpenCable] = useState(true);
  const [openPhone, setOpenPhone] = useState(true);

  //data for filter cable
  const [cableTypeList, setCableTypeList] = useState([]);
  const [lengthList, setLengthList] = useState([]);

  //data for filter power bank
  const [inputList, setInputList] = useState([]);
  const [outputList, setOutputList] = useState([]);
  const [capacityList, setCapacityList] = useState([]);
  const [capacityLessList, setCapacityLessList] = useState([]);
  const [batteryGreaterList, setBatteryGreaterList] = useState([]);
  const [batteryLessList, setBatteryLessList] = useState([]);
  //button for filter rom phone
  const [selectedBtn1TB, setSelectedBtn1TB] = useState(false);
  const [selectedBtn3264GB, setSelectedBtn3264GB] = useState(false);
  const [selectedBtn128256GB, setSelectedBtn128256GB] = useState(false);
  const [selectedBtn512GB, setSelectedBtn512GB] = useState(false);
  const [selectedBtn2TB, setSelectedBtn2TB] = useState(false);

  //button for filter ram phone
  const [selectedBtn4GB, setSelectedBtn4GB] = useState(false);
  const [selectedBtn48GB, setSelectedBtn48GB] = useState(false);
  const [selectedBtn1216GB, setSelectedBtn1216GB] = useState(false);

  //button for filter chip phone
  const [selectedBtnMedia, setSelectedBtnMedia] = useState(false);
  const [selectedBtnQual, setSelectedBtnQual] = useState(false);
  const [selectedBtnAple, setSelectedBtnAple] = useState(false);
  const [selectedBtnSS, setSelectedBtnSS] = useState(false);

  const [selectedAppleEar, setSelectedAppleEar] = useState(false);
  const [selectedSamSungEar, setSelectedSamSungEar] = useState(false);
  const [selectedSonyEar, setSelectedSonyEar] = useState(false);
  const [selectedXiaomiEar, setSelectedXiaomiEar] = useState(false);
  const [selectedHuaweiEar, setSelectedHuaweiEar] = useState(false);
  const [selectedOtherEar, setSelectedOtherEar] = useState(false);

  //button for select category
  const [selectPhone, setSelectPhone] = useState(true);
  const [selectCable, setSelectCable] = useState(false);
  const [selectEar, setSelectEar] = useState(false);
  const [selectPower, setSelectPower] = useState(false);

  //button for select connection type
  const [selectedBtnBlue, setSelectedBtnBlue] = useState(false);
  const [selectedBtnWire, setSelectedBtnWire] = useState(false);

  //button for select cable type
  const [selectBtnTypeC, setSelectBtnTypeC] = useState(false);
  const [selectBtnUSBA, setSelectBtnUSBA] = useState(false);
  const [selectBtnUSBB, setSelectBtnUSBB] = useState(false);
  const [selectBtnMicroUSB, setSelectBtnMicroUSB] = useState(false);
  const [selectBtnLightning, setSelectBtnLightning] = useState(false);

  //button for select cable length
  const [selectBtnLess1M, setSelectBtnLess1M] = useState(false);
  const [selectBtn12M, setSelectBtn12M] = useState(false);

  //button for select capacity
  const [selectedBtnLess1000, setSelectedBtnLess1000] = useState(false);
  const [selectedBtn1000, setSelectedBtn1000] = useState(false);
  const [selectedBtn2000, setSelectedBtn2000] = useState(false);

  //button for select input
  const [selectedBtnWireless, setSelectedBtnWireless] = useState(false);
  const [selectedBtnMicroUSB, setSelectedBtnMicroUSB] = useState(false);
  const [selectedBtnUSBC, setSelectedBtnUSBC] = useState(false);

  //button for select fast
  const [selectedBtnFast1030W, setSelectedBtnFast1030W] = useState(false);
  const [selectedBtnFast3160W, setSelectedBtnFast3160W] = useState(false);

  //button for select input
  const [selectedBtnWirelessOut, setSelectedBtnWirelessOut] = useState(false);
  const [selectedBtnUSBA, setSelectedBtnUSBA] = useState(false);

  //value for filter follow price phone
  const [valuePhone, setValuePhone] = useState([0, 50000000]);

  //value for filter follow price EarPhone
  const [valueEar, setValueEar] = useState([0, 10000000]);

  //value for filter follow price Cable
  const [valueCable, setValueCable] = useState([0, 3000000]);

  //value for filter follow price Power bank
  const [valuePower, setValuePower] = useState([0, 5000000]);

  //value for price phone
  const marksPhone = [
    { value: 0, label: "0đ" },
    { value: 50000000, label: "50.000.000đ" },
  ];

  //value for price cable
  const marksCable = [
    { value: 0, label: "0đ" },
    { value: 3000000, label: "3.000.000đ" },
  ];

  //value for price earphone
  const marksEar = [
    { value: 0, label: "0đ" },
    { value: 10000000, label: "10.000.000đ" },
  ];

  //value for price power bank
  const marksPow = [
    { value: 0, label: "0đ" },
    { value: 5000000, label: "5.000.000đ" },
  ];

  const handleSelectPhone = () => {
    setSelectPhone(true);
    setSelectCable(false);
    setSelectEar(false);
    setSelectPower(false);
  };

  const handleSelectCable = () => {
    setSelectCable(true);
    setSelectEar(false);
    setSelectPhone(false);
    setSelectPower(false);
  };

  const handleSelectEar = () => {
    setSelectEar(true);
    setSelectCable(false);
    setSelectPhone(false);
    setSelectPower(false);
  };

  const handleSelectPow = () => {
    setSelectPower(true);
    setSelectEar(false);
    setSelectPhone(false);
    setSelectCable(false);
  };

  //method for handle button filter rom
  const handleClickBtn1TB = () => {
    setSelectedBtn1TB((preSelected) => {
      let newSelected = !preSelected;
      setRomList((preRomList) => {
        if (newSelected) {
          return preRomList.includes("TB_1")
            ? preRomList
            : [...preRomList, "TB_1"];
        } else {
          return preRomList.filter((item) => item !== "TB_1");
        }
      });
      return newSelected;
    });
  };
  const handleClickBtn2TB = () => {
    setSelectedBtn2TB((preSelected) => {
      let newSelected = !preSelected;
      setRomList((preRomList) => {
        if (newSelected) {
          return preRomList.includes("TB_2")
            ? preRomList
            : [...preRomList, "TB_2"];
        } else return preRomList.filter((item) => item !== "TB_2");
      });
      return newSelected;
    });
  };
  const handleClickBtn3264GB = () => {
    setSelectedBtn3264GB((preSelected) => {
      let newSelected = !preSelected;
      setRomList((preRomList) => {
        if (newSelected) {
          return [
            ...preRomList,
            ...["GB_32", "GB_64"].filter((rom) => !preRomList.includes(rom)),
          ];
        } else {
          return preRomList.filter(
            (item) => !["GB_32", "GB_64"].includes(item)
          );
        }
      });
      return newSelected;
    });
  };
  const handleClickBtn128256GB = () => {
    setSelectedBtn128256GB((preSelected) => {
      let newSelected = !preSelected;
      setRomList((preRomList) => {
        if (newSelected) {
          return [
            ...preRomList,
            ...["GB_128", "GB_256"].filter((rom) => !preRomList.includes(rom)),
          ];
        } else
          return preRomList.filter(
            (item) => !["GB_128", "GB_256"].includes(item)
          );
      });
      return newSelected;
    });
  };
  const handleClickBtn512GB = () => {
    setSelectedBtn512GB((preSelected) => {
      let newSelected = !preSelected;
      setRomList((preRomList) => {
        if (newSelected) {
          return preRomList.includes("GB_512")
            ? preRomList
            : [...preRomList, "GB_512"];
        } else {
          return preRomList.filter((item) => item !== "GB_512");
        }
      });
      return newSelected;
    });
  };

  const handleClickBtn48GB = () => {
    setSelectedBtn48GB((preSelected) => {
      let newSelected = !preSelected;
      setRamList((preRamList) => {
        if (newSelected) {
          return [
            ...preRamList,
            ...["GB_4", "GB_6", "GB_8"].filter(
              (ram) => !preRamList.includes(ram)
            ),
          ];
        } else {
          return preRamList.filter(
            (item) => !["GB_4", "GB_6", "GB_8"].includes(item)
          );
        }
      });
      return newSelected;
    });
  };

  const handleClickBtn1216GB = () => {
    setSelectedBtn1216GB((preSelected) => {
      let newSelected = !preSelected;
      setRamList((preRamList) => {
        if (newSelected) {
          return [
            ...preRamList,
            ...["GB_12", "GB_16"].filter((ram) => !preRamList.includes(ram)),
          ];
        } else {
          return preRamList.filter(
            (item) => !["GB_12", "GB_16"].includes(item)
          );
        }
      });
      return newSelected;
    });
  };

  //method for handle button filter chip
  const handleClickBtnMedia = () => {
    setSelectedBtnMedia((preSelected) => {
      let newSelected = !preSelected;
      setChipList((preChipList) => {
        if (newSelected) {
          return preChipList.includes("Helio")
            ? preChipList
            : [...preChipList, "Helio"];
        } else return preChipList.filter((item) => item !== "Helio");
      });
      return newSelected;
    });
  };
  const handleClickBtnQual = () => {
    setSelectedBtnQual((preSelected) => {
      let newSelected = !preSelected;
      setChipList((preChipList) => {
        if (newSelected) {
          return preChipList.includes("Snapdragon")
            ? preChipList
            : [...preChipList, "Snapdragon"];
        } else return preChipList.filter((item) => item !== "Snapdragon");
      });
      return newSelected;
    });
  };
  const handleClickBtnApple = () => {
    setSelectedBtnAple((preSelected) => {
      let newSelected = !preSelected;
      setChipList((preChipList) => {
        if (newSelected) {
          return preChipList.includes("A")
            ? preChipList
            : [...preChipList, "A"];
        } else return preChipList.filter((item) => item !== "A");
      });
      return newSelected;
    });
  };
  const handleClickBtnSS = () => {
    setSelectedBtnSS((preSelected) => {
      let newSelected = !preSelected;
      setChipList((preChipList) => {
        if (newSelected) {
          return preChipList.includes("Exynos")
            ? preChipList
            : [...preChipList, "Exynos"];
        } else return preChipList.filter((item) => item !== "Exynos");
      });
      return newSelected;
    });
  };

  //method for handle button filter connecttype
  const handleClickBtnBlue = () => {
    setSelectedBtnBlue((preSelected) => {
      let newSelected = !preSelected;
      setConnectTypeList((preConnectType) => {
        if (newSelected) {
          return preConnectType.includes("BLUETOOTH")
            ? preConnectType
            : [...preConnectType, "BLUETOOTH"];
        } else {
          return preConnectType.filter((item) => item !== "BLUETOOTH");
        }
      });
      return newSelected;
    });
  };
  const handleClickBtnWire = () => {
    setSelectedBtnWire((preSelected) => {
      let newSelected = !preSelected;
      setConnectTypeList((preConnectType) => {
        if (newSelected) {
          return preConnectType.includes("WIRELESS")
            ? preConnectType
            : [...preConnectType, "WIRELESS"];
        } else {
          return preConnectType.filter((item) => item !== "WIRELESS");
        }
      });
      return newSelected;
    });
  };

  //method for handle button filter brand earphone
  const handleClickBtnSSEar = () => {
    setSelectedSamSungEar((preSelected) => {
      let newSelected = !preSelected;
      setBrandList((preBrandList) => {
        if (newSelected) {
          return preBrandList.includes("SAMSUNG")
            ? preBrandList
            : [...preBrandList, "SAMSUNG"];
        } else {
          return preBrandList.filter((item) => item !== "SAMSUNG");
        }
      });
      return newSelected;
    });

    setSelectedOtherEar(false);
    setOther([]);
  };
  const handleClickBtnApleEar = () => {
    setSelectedAppleEar((preSelected) => {
      let newSelected = !preSelected;
      setBrandList((preBrandList) => {
        if (newSelected) {
          return preBrandList.includes("APPLE")
            ? preBrandList
            : [...preBrandList, "APPLE"];
        } else {
          return preBrandList.filter((item) => item !== "APPLE");
        }
      });
      return newSelected;
    });

    setSelectedOtherEar(false);
    setOther([]);
  };
  const handleClickBtnSonyEar = () => {
    setSelectedSonyEar((preSelected) => {
      let newSelected = !preSelected;
      setBrandList((preBrandList) => {
        if (newSelected) {
          return preBrandList.includes("SONY")
            ? preBrandList
            : [...preBrandList, "SONY"];
        } else {
          return preBrandList.filter((item) => item !== "SONY");
        }
      });
      return newSelected;
    });

    setSelectedOtherEar(false);
    setOther([]);
  };
  const handleClickBtnHuaweiEar = () => {
    setSelectedHuaweiEar((preSelected) => {
      let newSelected = !preSelected;
      setBrandList((preBrandList) => {
        if (newSelected) {
          return preBrandList.includes("HUAWEI")
            ? preBrandList
            : [...preBrandList, "HUAWEI"];
        } else {
          return preBrandList.filter((item) => item !== "HUAWEI");
        }
      });
      return newSelected;
    });

    setSelectedOtherEar(false);
    setOther([]);
  };
  const handleClickBtnXiaomiEar = () => {
    setSelectedXiaomiEar((preSelected) => {
      let newSelected = !preSelected;
      setBrandList((preBrandList) => {
        if (newSelected) {
          return preBrandList.includes("XIAOMI")
            ? preBrandList
            : [...preBrandList, "XIAOMI"];
        } else {
          return preBrandList.filter((item) => item !== "XIAOMI");
        }
      });
      return newSelected;
    });

    setSelectedOtherEar(false);
    setOther([]);
  };
  const handleClickBtnOtherEar = () => {
    setSelectedOtherEar((preSelected) => {
      let newSelected = !preSelected;
      setOther((preBrandList) => {
        if (newSelected) {
          return preBrandList.includes("OTHER")
            ? preBrandList
            : [...preBrandList, "OTHER"];
        } else {
          return preBrandList.filter((item) => item !== "OTHER");
        }
      });
      return newSelected;
    });
    setSelectedXiaomiEar(false);
    setSelectedHuaweiEar(false);
    setSelectedSonyEar(false);
    setSelectedSonyEar(false);
    setSelectedSamSungEar(false);
    setSelectedAppleEar(false);
    setBrandList([]);
  };

  //method for handle button filter cable type
  const handleClickBtnTypeC = () => {
    setSelectBtnTypeC((preSelected) => {
      let newSelected = !preSelected;
      setCableTypeList((preCableTypeList) => {
        if (newSelected) {
          return preCableTypeList.includes("TYPE_C")
            ? preCableTypeList
            : [...preCableTypeList, "TYPE_C"];
        } else {
          return preCableTypeList.filter((item) => item !== "TYPE_C");
        }
      });
      return newSelected;
    });
  };

  const handleClickBtnUSBA = () => {
    setSelectBtnUSBA((preSelected) => {
      let newSelected = !preSelected;
      setCableTypeList((preCableTypeList) => {
        if (newSelected) {
          return preCableTypeList.includes("USB_A")
            ? preCableTypeList
            : [...preCableTypeList, "USB_A"];
        } else {
          return preCableTypeList.filter((item) => item !== "USB_A");
        }
      });
      return newSelected;
    });
  };

  const handleClickBtnUSBB = () => {
    setSelectBtnUSBB((preSelected) => {
      let newSelected = !preSelected;
      setCableTypeList((preCableTypeList) => {
        if (newSelected) {
          return preCableTypeList.includes("USB_B")
            ? preCableTypeList
            : [...preCableTypeList, "USB_B"];
        } else {
          return preCableTypeList.filter((item) => item !== "USB_B");
        }
      });
      return newSelected;
    });
  };

  const handleClickBtnLightNing = () => {
    setSelectBtnLightning((preSelected) => {
      let newSelected = !preSelected;
      setCableTypeList((preCableTypeList) => {
        if (newSelected) {
          return preCableTypeList.includes("LIGHTNING")
            ? preCableTypeList
            : [...preCableTypeList, "LIGHTNING"];
        } else {
          return preCableTypeList.filter((item) => item !== "LIGHTNING");
        }
      });
      return newSelected;
    });
  };

  const handleClickBtnMicro = () => {
    setSelectBtnMicroUSB((preSelected) => {
      let newSelected = !preSelected;
      setCableTypeList((preCableTypeList) => {
        if (newSelected) {
          return preCableTypeList.includes("MICRO_USB")
            ? preCableTypeList
            : [...preCableTypeList, "MICRO_USB"];
        } else {
          return preCableTypeList.filter((item) => item !== "MICRO_USB");
        }
      });
      return newSelected;
    });
  };

  //method for handle button length cable
  const handleClickBtnLess1M = () => {
    setSelectBtnLess1M((preSelected) => {
      let newSelected = !preSelected;
      setLengthList((preLengthList) => {
        if (newSelected) {
          return preLengthList.includes("100")
            ? preLengthList
            : [...preLengthList, "100"];
        } else {
          return preLengthList.filter((item) => item !== "100");
        }
      });
      return newSelected;
    });
  };
  const handleClickBtn12M = () => {
    setSelectBtn12M((preSelected) => {
      let newSelected = !preSelected;
      setLengthList((preLengthList) => {
        if (newSelected) {
          return preLengthList.includes("200")
            ? preLengthList
            : [...preLengthList, "200"];
        } else {
          return preLengthList.filter((item) => item !== "200");
        }
      });
      return newSelected;
    });
  };

  //method for handle button filter capacity
  const handleClickBtnLess1000 = () => {
    setSelectedBtnLess1000((preSelected) => {
      let newSelected = !preSelected;
      setCapacityLessList((preCapacityLess) => {
        if (newSelected) {
          return preCapacityLess.includes("10000")
            ? preCapacityLess
            : [...preCapacityLess, "10000"];
        } else {
          return preCapacityLess.filter((item) => item !== "10000");
        }
      });
      return newSelected;
    });
    setSelectedBtn1000(false);
    setSelectedBtn2000(false);
    setCapacityList([]);
  };
  const handleClickBtn1000 = () => {
    setSelectedBtn1000((preSelected) => {
      let newSelected = !preSelected;
      setCapacityList((preCapacity) => {
        if (newSelected) {
          return preCapacity.includes("10000")
            ? preCapacity
            : [...preCapacity, "10000"];
        } else {
          return preCapacity.filter((item) => item !== "10000");
        }
      });
      return newSelected;
    });
    setSelectedBtnLess1000(false);
    setCapacityLessList([]);
  };
  const handleClickBtn2000 = () => {
    setSelectedBtn2000((preSelected) => {
      let newSelected = !preSelected;
      setCapacityList((preCapacity) => {
        if (newSelected) {
          return preCapacity.includes("20000")
            ? preCapacity
            : [...preCapacity, "20000"];
        } else {
          return preCapacity.filter((item) => item !== "20000");
        }
      });
      return newSelected;
    });
    setSelectedBtnLess1000(false);
    setCapacityLessList([]);
  };

  //method for handle button filter input
  const handleClickBtnWireless = () => {
    setSelectedBtnWireless((preSelected) => {
      let newSelected = !preSelected;
      setInputList((preInputList) => {
        if (newSelected) {
          return preInputList.includes("WIRELESS")
            ? preInputList
            : [...preInputList, "WIRELESS"];
        } else {
          return preInputList.filter((item) => item !== "WIRELESS");
        }
      });
      return newSelected;
    });
  };
  const handleClickBtnMicroUSB = () => {
    setSelectedBtnMicroUSB((preSelected) => {
      let newSelected = !preSelected;
      setInputList((preInputList) => {
        if (newSelected) {
          return preInputList.includes("Micro USB")
            ? preInputList
            : [...preInputList, "Micro USB"];
        } else {
          return preInputList.filter((item) => item !== "Micro USB");
        }
      });
      return newSelected;
    });
  };
  const handleClickBtnUSBC = () => {
    setSelectedBtnUSBC((preSelected) => {
      let newSelected = !preSelected;
      setInputList((preInputList) => {
        if (newSelected) {
          return preInputList.includes("USB-C")
            ? preInputList
            : [...preInputList, "USB-C"];
        } else {
          return preInputList.filter((item) => item !== "USB-C");
        }
      });
      return newSelected;
    });
  };

  //method for handle button filter output
  const handleClickBtnWirelessOut = () => {
    setSelectedBtnWirelessOut((preSelected) => {
      let newSelected = !preSelected;
      setOutputList((preOutputList) => {
        if (newSelected) {
          return preOutputList.includes("WIRELESS")
            ? preOutputList
            : [...preOutputList, "WIRELESS"];
        } else {
          return preOutputList.filter((item) => item !== "WIRELESS");
        }
      });
      return newSelected;
    });
  };
  const handleClickBtnMicroUSBA = () => {
    setSelectedBtnUSBA((preSelected) => {
      let newSelected = !preSelected;
      setOutputList((preOutputList) => {
        if (newSelected) {
          return preOutputList.includes("USB-A")
            ? preOutputList
            : [...preOutputList, "USB-A"];
        } else {
          return preOutputList.filter((item) => item !== "USB-A");
        }
      });
      return newSelected;
    });
  };

  //method for handle button filter fast
  const handleClickBtnFast1030 = () => {
    setSelectedBtnFast1030W((preSelected) => {
      let newSelected = !preSelected;
      setBatteryLessList((preBatteryLessList) => {
        if (newSelected) {
          return preBatteryLessList.includes("10")
            ? preBatteryLessList
            : [...preBatteryLessList, "10"];
        } else {
          return preBatteryLessList.filter((item) => item !== "10");
        }
      });
      setBatteryGreaterList((preBatteryGreaterList) => {
        if (newSelected) {
          return preBatteryGreaterList.includes("30")
            ? preBatteryGreaterList
            : [...preBatteryGreaterList, "30"];
        } else {
          return preBatteryGreaterList.filter((item) => item !== "30");
        }
      });
      return newSelected;
    });
  };
  const handleClickBtnFast3160 = () => {
    setSelectedBtnFast3160W((preSelected) => {
      let newSelected = !preSelected;
      setBatteryLessList((preBatteryLessList) => {
        if (newSelected) {
          return preBatteryLessList.includes("31")
            ? preBatteryLessList
            : [...preBatteryLessList, "31"];
        } else {
          return preBatteryLessList.filter((item) => item !== "31");
        }
      });
      setBatteryGreaterList((preBatteryGreaterList) => {
        if (newSelected) {
          return preBatteryGreaterList.includes("60")
            ? preBatteryGreaterList
            : [...preBatteryGreaterList, "60"];
        } else {
          return preBatteryGreaterList.filter((item) => item !== "60");
        }
      });
      return newSelected;
    });
  };
  //
  const handleClickCable = () => {
    setOpenCable(!openCable);
  };
  const handleClickPhone = () => {
    setOpenPhone(!openPhone);
  };
  useEffect(() => {
    Promise.all([
      listProductBySearchTerm(),
      searchProductNewest(),
      searchProductSale(),
    ])
      .then(
        ([listProductResponse, listProductNewestResponse, listProductSale]) => {
          setProduct(listProductResponse.data);
          setProductsNewest(listProductNewestResponse.data);
          setProductsSale(listProductSale.data);
          setData(listProductResponse.data);
        }
      )
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleButtonNewest = () => {
    setData(productsNewest);
  };
  const handleButtonSale = () => setData(productsSale);
  const handleButtonCategory = (category) => {
    searchProductByCategory(category)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    if (category === "earphone") {
      handleSelectEar();
    } else if (category === "charging_cable") {
      handleSelectCable();
    } else if (category === "power_bank") {
      handleSelectPow();
    } else {
      handleSelectPhone();
    }
  };

  const handleButtonBrand = (searchTerm) => {
    listProductBySearchTerm(searchTerm)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    handleSelectPhone();
  };

  const handleButtonPhoneFilter = (
    ramList,
    romList,
    chipList,
    minPrice,
    maxPrice
  ) => {
    listPhoneByFilter(ramList, romList, chipList, minPrice, maxPrice)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    setSelectedBtn1TB(false);
    setSelectedBtn2TB(false);
    setSelectedBtn512GB(false);
    setSelectedBtn128256GB(false);
    setSelectedBtn3264GB(false);
    setSelectedBtn4GB(false);
    setSelectedBtn48GB(false);
    setSelectedBtn1216GB(false);
    setSelectedBtnAple(false);
    setSelectedBtnQual(false);
    setSelectedBtnSS(false);
    setSelectedBtnMedia(false);
    setValuePhone([0, 50000000]);
    setRomList([]);
    setRamList([]);
    setChipList([]);
  };

  const handleButtonEarphoneFilter = (
    conntectTypeList,
    brandList,
    other,
    minPrice,
    maxPrice
  ) => {
    listEarPhoneByFilter(conntectTypeList, brandList, other, minPrice, maxPrice)
      .then((response) => setData(response.data))
      .catch((error) => console.log(error));
    setSelectedAppleEar(false);
    setSelectedSamSungEar(false);
    setSelectedXiaomiEar(false);
    setSelectedSonyEar(false);
    setSelectedSonyEar(false);
    setSelectedHuaweiEar(false);
    setSelectedOtherEar(false);
    setSelectedBtnBlue(false);
    setSelectedBtnWire(false);
    setValueEar([0, 10000000]);
    setConnectTypeList([]);
    setBrandList([]);
  };

  const handleButtonCableFilter = (
    cableList,
    lengthList,
    minPrice,
    maxPrice
  ) => {
    listCableByFilter(cableList, lengthList, minPrice, maxPrice)
      .then((response) => setData(response.data))
      .catch((error) => console.log(error));
    setSelectBtnTypeC(false);
    setSelectBtnUSBA(false);
    setSelectBtnUSBB(false);
    setSelectBtnMicroUSB(false);
    setSelectBtnLightning(false);
    setSelectBtnLess1M(false);
    setSelectBtn12M(false);
    setValueCable([0, 3000000]);
    setCableTypeList([]);
    setLengthList([]);
  };

  const handleButtonPowerBankFilter = (
    inputList,
    outputList,
    capacityList,
    capacityLessList,
    batteryGreaterList,
    batteryLessList,
    minPrice,
    maxPrice
  ) => {
    console.log(batteryGreaterList);
    console.log(batteryLessList);
    listPowerBankByFilter(
      inputList,
      outputList,
      capacityList,
      capacityLessList,
      batteryGreaterList,
      batteryLessList,
      minPrice,
      maxPrice
    )
      .then((response) => setData(response.data))
      .catch((error) => console.log(error));
    setSelectedBtnWireless(false);
    setSelectedBtnWirelessOut(false);
    setSelectedBtnMicroUSB(false);
    setSelectedBtnUSBC(false);
    setSelectedBtnUSBA(false);
    setSelectedBtnFast3160W(false);
    setSelectedBtnFast1030W(false);
    setValuePower([0, 50000000]);
    setInputList([]);
    setOutputList([]);
    setBatteryGreaterList([]);
    setBatteryLessList([]);
  };

  const handleChangeValuePhone = (event, newValue) => {
    setValuePhone(newValue);
  };

  const handleChangeValueEarPhone = (event, newValue) => {
    setValueEar(newValue);
  };

  const handleChangeValueCable = (event, newValue) => {
    setValueCable(newValue);
  };

  const handleChangeValuePower = (event, newValue) => {
    setValuePower(newValue);
  };

  const valuetext = (value) => {
    return `${new Intl.NumberFormat("de-DE").format(value)}đ`;
  };

  const buttons = [
    <Button sx={{ width: "100%", fontSize: 20 }} onClick={handleButtonNewest}>
      Sản phẩm mới
    </Button>,
    <Button sx={{ width: "100%", fontSize: 20 }} onClick={handleButtonSale}>
      Ưu đãi
    </Button>,
    <Button
      sx={{ width: "100%", fontSize: 20 }}
      onClick={() => handleButtonBrand("iphone")}
    >
      Iphone
    </Button>,
    <Button
      sx={{ width: "100%", fontSize: 20 }}
      onClick={() => handleButtonBrand("samsung")}
    >
      SamSung
    </Button>,
    <Button
      sx={{ width: "100%", fontSize: 20 }}
      onClick={() => handleButtonBrand("xiaomi")}
    >
      Xiaomi
    </Button>,
    <Button
      sx={{ width: "100%", fontSize: 20 }}
      onClick={() => handleButtonBrand("oppo")}
    >
      Oppo
    </Button>,
    <Button
      sx={{ width: "100%", fontSize: 20 }}
      onClick={() => handleButtonBrand("realme")}
    >
      Realme
    </Button>,
    <Button
      sx={{ width: "100%", fontSize: 20 }}
      onClick={() => handleButtonBrand("oneplus")}
    >
      Oneplus
    </Button>,
    <Button
      sx={{ width: "100%", fontSize: 20 }}
      onClick={() => handleButtonBrand("nokia")}
    >
      Nokia
    </Button>,
    <Button
      sx={{ width: "100%", fontSize: 20 }}
      onClick={() => handleButtonBrand("sony")}
    >
      Sony
    </Button>,
  ];

  return (
    <Box p={5} sx={{ display: "flex" }}>
      <Box
        sx={{
          position: "sticky", // Make it stick to the viewport
          top: 20, // Add some space from the top
          height: "100vh",
          width: "20%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          overflowY: "auto", // Enable scroll if content overflows
        }}
      >
        <Box
          sx={{
            width: "70%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            mt: 10,
          }}
        >
          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
              <ListSubheader
                component="div"
                id="nested-list-subheader"
                sx={{ fontWeight: "bold" }}
              >
                Danh sách sản phẩm
              </ListSubheader>
            }
          >
            <ListItemButton onClick={handleClickPhone}>
              <ListItemIcon>
                <PhoneIcon />
              </ListItemIcon>
              <ListItemText primary="Điện thoại" />
              {openPhone ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openPhone} timeout="auto" unmountOnExit>
              <List>
                {/* <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon></ListItemIcon>
                  <ListItemText>NEW</ListItemText>
                </ListItemButton> */}
                {/* <ListItemButton sx={{ pl: 4 }} onClick={handleButtonSale}>
                  <ListItemIcon></ListItemIcon>
                  <ListItemText sx={{ color: "red" }}>ƯU ĐÃI</ListItemText>
                </ListItemButton> */}
                <ListItemButton
                  sx={{ pl: 4 }}
                  onClick={() => handleButtonBrand("iphone")}
                >
                  <ListItemIcon></ListItemIcon>
                  <ListItemText>IPHONE</ListItemText>
                </ListItemButton>
                <ListItemButton
                  sx={{ pl: 4 }}
                  onClick={() => handleButtonBrand("samsung")}
                >
                  <ListItemIcon></ListItemIcon>
                  <ListItemText>SAMSUNG</ListItemText>
                </ListItemButton>
                <ListItemButton
                  sx={{ pl: 4 }}
                  onClick={() => handleButtonBrand("xiaomi")}
                >
                  <ListItemIcon></ListItemIcon>
                  <ListItemText>XIOAMI</ListItemText>
                </ListItemButton>
                <ListItemButton
                  sx={{ pl: 4 }}
                  onClick={() => handleButtonBrand("oppo")}
                >
                  <ListItemIcon></ListItemIcon>
                  <ListItemText>OPPO</ListItemText>
                </ListItemButton>
                <ListItemButton
                  sx={{ pl: 4 }}
                  onClick={() => handleButtonBrand("realme")}
                >
                  <ListItemIcon></ListItemIcon>
                  <ListItemText>REALME</ListItemText>
                </ListItemButton>
                <ListItemButton
                  sx={{ pl: 4 }}
                  onClick={() => handleButtonBrand("oneplus")}
                >
                  <ListItemIcon></ListItemIcon>
                  <ListItemText>ONEPLUS</ListItemText>
                </ListItemButton>
                <ListItemButton
                  sx={{ pl: 4 }}
                  onClick={() => handleButtonBrand("nokia")}
                >
                  <ListItemIcon></ListItemIcon>
                  <ListItemText>NOKIA</ListItemText>
                </ListItemButton>
                <ListItemButton
                  sx={{ pl: 4 }}
                  onClick={() => handleButtonBrand("sony")}
                >
                  <ListItemIcon></ListItemIcon>
                  <ListItemText>SONY</ListItemText>
                </ListItemButton>
              </List>
            </Collapse>
            <ListItemButton onClick={handleClickCable}>
              <ListItemIcon>
                <CableIcon />
              </ListItemIcon>
              <ListItemText primary="Phụ kiện" />
              {openCable ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openCable} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton
                  sx={{ pl: 4 }}
                  onClick={() => handleButtonCategory("earphone")}
                >
                  <ListItemIcon></ListItemIcon>
                  <ListItemText primary="Tai nghe" />
                </ListItemButton>
                <ListItemButton
                  sx={{ pl: 4 }}
                  onClick={() => handleButtonCategory("charging_cable")}
                >
                  <ListItemIcon></ListItemIcon>
                  <ListItemText primary="Dây sạc" />
                </ListItemButton>
                <ListItemButton
                  sx={{ pl: 4 }}
                  onClick={() => handleButtonCategory("power_bank")}
                >
                  <ListItemIcon></ListItemIcon>
                  <ListItemText primary="Sạc dự phòng" />
                </ListItemButton>
              </List>
            </Collapse>
          </List>
        </Box>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", width: "80%" }}>
        {selectPhone && (
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Box padding={2} width="200px">
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography sx={{ fontWeight: "bold" }}>Rom</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid2 container spacing={2}>
                    <Grid2 item>
                      <Button
                        onClick={handleClickBtn3264GB}
                        sx={{
                          color: selectedBtn3264GB ? "red" : "black",
                          backgroundColor: selectedBtn3264GB
                            ? "#fef2f2"
                            : "#f3f4f6",
                          border: selectedBtn3264GB
                            ? "1px solid red"
                            : "GrayText",
                          borderRadius: 3,
                        }}
                        variant="outlined"
                      >
                        32GB và 64GB
                      </Button>
                    </Grid2>
                    <Grid2 item>
                      <Button
                        onClick={handleClickBtn128256GB}
                        sx={{
                          color: selectedBtn128256GB ? "red" : "black",
                          backgroundColor: selectedBtn128256GB
                            ? "#fef2f2"
                            : "#f3f4f6",
                          border: selectedBtn128256GB
                            ? "1px solid red"
                            : "GrayText",
                          borderRadius: 3,
                        }}
                        variant="outlined"
                      >
                        128GB và 256GB
                      </Button>
                    </Grid2>
                    <Grid2 item>
                      <Button
                        onClick={handleClickBtn512GB}
                        sx={{
                          color: selectedBtn512GB ? "red" : "black",
                          backgroundColor: selectedBtn512GB
                            ? "#fef2f2"
                            : "#f3f4f6",
                          border: selectedBtn512GB
                            ? "1px solid red"
                            : "GrayText",
                          borderRadius: 3,
                        }}
                        variant="outlined"
                      >
                        512GB
                      </Button>
                    </Grid2>
                    <Grid2 item>
                      <Button
                        onClick={handleClickBtn1TB}
                        sx={{
                          color: selectedBtn1TB ? "red" : "black",
                          backgroundColor: selectedBtn1TB
                            ? "#fef2f2"
                            : "#f3f4f6",
                          border: selectedBtn1TB ? "1px solid red" : "GrayText",
                          borderRadius: 3,
                        }}
                        variant="outlined"
                      >
                        1TB
                      </Button>
                    </Grid2>
                    <Grid2 item>
                      <Button
                        onClick={handleClickBtn2TB}
                        sx={{
                          color: selectedBtn2TB ? "red" : "black",
                          backgroundColor: selectedBtn2TB
                            ? "#fef2f2"
                            : "#f3f4f6",
                          border: selectedBtn2TB ? "1px solid red" : "GrayText",
                          borderRadius: 3,
                        }}
                        variant="outlined"
                      >
                        2TB
                      </Button>
                    </Grid2>
                  </Grid2>
                </AccordionDetails>
              </Accordion>
            </Box>
            <Box padding={2} width="200px">
              {/* Màn hình */}
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography sx={{ fontWeight: "bold" }}>Ram</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid2 container spacing={2}>
                    <Grid2 item>
                      <Button
                        onClick={handleClickBtn48GB}
                        sx={{
                          color: selectedBtn48GB ? "red" : "black",
                          backgroundColor: selectedBtn48GB
                            ? "#fef2f2"
                            : "#f3f4f6",
                          border: selectedBtn48GB
                            ? "1px solid red"
                            : "GrayText",
                          borderRadius: 3,
                        }}
                        variant="outlined"
                      >
                        4GB và 8GB
                      </Button>
                    </Grid2>
                    <Grid2 item>
                      <Button
                        onClick={handleClickBtn1216GB}
                        sx={{
                          color: selectedBtn1216GB ? "red" : "black",
                          backgroundColor: selectedBtn1216GB
                            ? "#fef2f2"
                            : "#f3f4f6",
                          border: selectedBtn1216GB
                            ? "1px solid red"
                            : "GrayText",
                          borderRadius: 3,
                        }}
                        variant="outlined"
                      >
                        12GB và 16GB
                      </Button>
                    </Grid2>
                  </Grid2>
                </AccordionDetails>
              </Accordion>
            </Box>
            <Box padding={2} width="200px">
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography sx={{ fontWeight: "bold" }}>Chip</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid2 container spacing={2}>
                    <Grid2 item>
                      <Button
                        onClick={handleClickBtnMedia}
                        sx={{
                          color: selectedBtnMedia ? "red" : "black",
                          backgroundColor: selectedBtnMedia
                            ? "#fef2f2"
                            : "#f3f4f6",
                          border: selectedBtnMedia
                            ? "1px solid red"
                            : "GrayText",
                          borderRadius: 3,
                        }}
                        variant="outlined"
                      >
                        MediaTek
                      </Button>
                    </Grid2>
                    <Grid2 item>
                      <Button
                        onClick={handleClickBtnQual}
                        sx={{
                          color: selectedBtnQual ? "red" : "black",
                          backgroundColor: selectedBtnQual
                            ? "#fef2f2"
                            : "#f3f4f6",
                          border: selectedBtnQual
                            ? "1px solid red"
                            : "GrayText",
                          borderRadius: 3,
                        }}
                        variant="outlined"
                      >
                        Qualcomm
                      </Button>
                    </Grid2>
                    <Grid2 item>
                      <Button
                        onClick={handleClickBtnApple}
                        sx={{
                          color: selectedBtnAple ? "red" : "black",
                          backgroundColor: selectedBtnAple
                            ? "#fef2f2"
                            : "#f3f4f6",
                          border: selectedBtnAple
                            ? "1px solid red"
                            : "GrayText",
                          borderRadius: 3,
                        }}
                        variant="outlined"
                      >
                        Apple
                      </Button>
                    </Grid2>
                    <Grid2 item>
                      <Button
                        onClick={handleClickBtnSS}
                        sx={{
                          color: selectedBtnSS ? "red" : "black",
                          backgroundColor: selectedBtnSS
                            ? "#fef2f2"
                            : "#f3f4f6",
                          border: selectedBtnSS ? "1px solid red" : "GrayText",
                          borderRadius: 3,
                        }}
                        variant="outlined"
                      >
                        SamSung
                      </Button>
                    </Grid2>
                  </Grid2>
                </AccordionDetails>
              </Accordion>
            </Box>
            <Box padding={2} width="300px">
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography sx={{ fontWeight: "bold" }}>Giá</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Slider
                    getAriaLabel={() => "price range"}
                    value={valuePhone}
                    marks={marksPhone}
                    step={200000}
                    min={0}
                    max={50000000}
                    onChange={handleChangeValuePhone}
                    valueLabelDisplay="auto"
                    valueLabelFormat={valuetext}
                    getAriaValueText={valuetext}
                    sx={{ color: "red" }}
                  />
                </AccordionDetails>
              </Accordion>
            </Box>
            <Box padding={2} width="100px">
              <Button
                variant="contained"
                color="primary"
                onClick={() =>
                  handleButtonPhoneFilter(
                    ramList.join(","),
                    romList.join(","),
                    chipList.join(","),
                    valuePhone[0],
                    valuePhone[1]
                  )
                }
              >
                Tìm kiếm
              </Button>
            </Box>
          </Box>
        )}
        {selectEar && (
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Box padding={2} width="200px">
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography sx={{ fontWeight: "bold" }}>Hãng</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid2 container spacing={2}>
                    <Grid2 item>
                      <Button
                        onClick={handleClickBtnApleEar}
                        sx={{
                          color: selectedAppleEar ? "red" : "black",
                          backgroundColor: selectedAppleEar
                            ? "#fef2f2"
                            : "#f3f4f6",
                          border: selectedAppleEar
                            ? "1px solid red"
                            : "GrayText",
                          borderRadius: 3,
                        }}
                        variant="outlined"
                      >
                        Apple
                      </Button>
                    </Grid2>
                    <Grid2 item>
                      <Button
                        onClick={handleClickBtnSSEar}
                        sx={{
                          color: selectedSamSungEar ? "red" : "black",
                          backgroundColor: selectedSamSungEar
                            ? "#fef2f2"
                            : "#f3f4f6",
                          border: selectedSamSungEar
                            ? "1px solid red"
                            : "GrayText",
                          borderRadius: 3,
                        }}
                        variant="outlined"
                      >
                        SamSung
                      </Button>
                    </Grid2>
                    <Grid2 item>
                      <Button
                        onClick={handleClickBtnXiaomiEar}
                        sx={{
                          color: selectedXiaomiEar ? "red" : "black",
                          backgroundColor: selectedXiaomiEar
                            ? "#fef2f2"
                            : "#f3f4f6",
                          border: selectedXiaomiEar
                            ? "1px solid red"
                            : "GrayText",
                          borderRadius: 3,
                        }}
                        variant="outlined"
                      >
                        Xiaomi
                      </Button>
                    </Grid2>
                    <Grid2 item>
                      <Button
                        onClick={handleClickBtnSonyEar}
                        sx={{
                          color: selectedSonyEar ? "red" : "black",
                          backgroundColor: selectedSonyEar
                            ? "#fef2f2"
                            : "#f3f4f6",
                          border: selectedSonyEar
                            ? "1px solid red"
                            : "GrayText",
                          borderRadius: 3,
                        }}
                        variant="outlined"
                      >
                        Sony
                      </Button>
                    </Grid2>
                    <Grid2 item>
                      <Button
                        onClick={handleClickBtnHuaweiEar}
                        sx={{
                          color: selectedHuaweiEar ? "red" : "black",
                          backgroundColor: selectedHuaweiEar
                            ? "#fef2f2"
                            : "#f3f4f6",
                          border: selectedHuaweiEar
                            ? "1px solid red"
                            : "GrayText",
                          borderRadius: 3,
                        }}
                        variant="outlined"
                      >
                        Huawei
                      </Button>
                    </Grid2>
                    <Grid2 item>
                      <Button
                        onClick={handleClickBtnOtherEar}
                        sx={{
                          color: selectedOtherEar ? "red" : "black",
                          backgroundColor: selectedOtherEar
                            ? "#fef2f2"
                            : "#f3f4f6",
                          border: selectedOtherEar
                            ? "1px solid red"
                            : "GrayText",
                          borderRadius: 3,
                        }}
                        variant="outlined"
                      >
                        Các hãng khác
                      </Button>
                    </Grid2>
                  </Grid2>
                </AccordionDetails>
              </Accordion>
            </Box>
            <Box padding={2} width="200px">
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography sx={{ fontWeight: "bold" }}>
                    Cổng kết nối
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid2 container spacing={2}>
                    <Grid2 item>
                      <Button
                        onClick={handleClickBtnBlue}
                        sx={{
                          color: selectedBtnBlue ? "red" : "black",
                          backgroundColor: selectedBtnBlue
                            ? "#fef2f2"
                            : "#f3f4f6",
                          border: selectedBtnBlue
                            ? "1px solid red"
                            : "GrayText",
                          borderRadius: 3,
                        }}
                        variant="outlined"
                      >
                        Bluetooth
                      </Button>
                    </Grid2>
                    <Grid2 item>
                      <Button
                        onClick={handleClickBtnWire}
                        sx={{
                          color: selectedBtnWire ? "red" : "black",
                          backgroundColor: selectedBtnWire
                            ? "#fef2f2"
                            : "#f3f4f6",
                          border: selectedBtnWire
                            ? "1px solid red"
                            : "GrayText",
                          borderRadius: 3,
                        }}
                        variant="outlined"
                      >
                        wireless
                      </Button>
                    </Grid2>
                  </Grid2>
                </AccordionDetails>
              </Accordion>
            </Box>
            <Box padding={2} width="300px">
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography sx={{ fontWeight: "bold" }}>Giá</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Slider
                    getAriaLabel={() => "price range"}
                    value={valueEar}
                    marks={marksEar}
                    step={100000}
                    min={0}
                    max={10000000}
                    onChange={handleChangeValueEarPhone}
                    valueLabelDisplay="auto"
                    valueLabelFormat={valuetext}
                    getAriaValueText={valuetext}
                    sx={{ color: "red" }}
                  />
                </AccordionDetails>
              </Accordion>
            </Box>
            <Box padding={2} width="100px">
              <Button
                variant="contained"
                color="primary"
                onClick={() =>
                  handleButtonEarphoneFilter(
                    brandList.join(","),
                    connectTypeList.join(","),
                    other.join(","),
                    valueEar[0],
                    valueEar[1]
                  )
                }
              >
                Tìm kiếm
              </Button>
            </Box>
          </Box>
        )}
        {selectCable && (
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Box padding={2} width="200px">
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography sx={{ fontWeight: "bold" }}>
                    Loại cáp sạc
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid2 container spacing={2}>
                    <Grid2 item>
                      <Button
                        onClick={handleClickBtnTypeC}
                        sx={{
                          color: selectBtnTypeC ? "red" : "black",
                          backgroundColor: selectBtnTypeC
                            ? "#fef2f2"
                            : "#f3f4f6",
                          border: selectBtnTypeC ? "1px solid red" : "GrayText",
                          borderRadius: 3,
                        }}
                        variant="outlined"
                      >
                        TypeC
                      </Button>
                    </Grid2>
                    <Grid2 item>
                      <Button
                        onClick={handleClickBtnUSBA}
                        sx={{
                          color: selectBtnUSBA ? "red" : "black",
                          backgroundColor: selectBtnUSBA
                            ? "#fef2f2"
                            : "#f3f4f6",
                          border: selectBtnUSBA ? "1px solid red" : "GrayText",
                          borderRadius: 3,
                        }}
                        variant="outlined"
                      >
                        Usb-a
                      </Button>
                    </Grid2>
                    <Grid2 item>
                      <Button
                        onClick={handleClickBtnUSBB}
                        sx={{
                          color: selectBtnUSBB ? "red" : "black",
                          backgroundColor: selectBtnUSBB
                            ? "#fef2f2"
                            : "#f3f4f6",
                          border: selectBtnUSBB ? "1px solid red" : "GrayText",
                          borderRadius: 3,
                        }}
                        variant="outlined"
                      >
                        usb-b
                      </Button>
                    </Grid2>
                    <Grid2 item>
                      <Button
                        onClick={handleClickBtnLightNing}
                        sx={{
                          color: selectBtnLightning ? "red" : "black",
                          backgroundColor: selectBtnLightning
                            ? "#fef2f2"
                            : "#f3f4f6",
                          border: selectBtnLightning
                            ? "1px solid red"
                            : "GrayText",
                          borderRadius: 3,
                        }}
                        variant="outlined"
                      >
                        lightning
                      </Button>
                    </Grid2>
                    <Grid2 item>
                      <Button
                        onClick={handleClickBtnMicro}
                        sx={{
                          color: selectBtnMicroUSB ? "red" : "black",
                          backgroundColor: selectBtnMicroUSB
                            ? "#fef2f2"
                            : "#f3f4f6",
                          border: selectBtnMicroUSB
                            ? "1px solid red"
                            : "GrayText",
                          borderRadius: 3,
                        }}
                        variant="outlined"
                      >
                        micro_usb
                      </Button>
                    </Grid2>
                  </Grid2>
                </AccordionDetails>
              </Accordion>
            </Box>
            <Box padding={2} width="200px">
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography sx={{ fontWeight: "bold" }}>Độ dài</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid2 container spacing={2}>
                    <Grid2 item>
                      <Button
                        onClick={handleClickBtnLess1M}
                        sx={{
                          color: selectBtnLess1M ? "red" : "black",
                          backgroundColor: selectBtnLess1M
                            ? "#fef2f2"
                            : "#f3f4f6",
                          border: selectBtnLess1M
                            ? "1px solid red"
                            : "GrayText",
                          borderRadius: 3,
                        }}
                        variant="outlined"
                      >
                        dưới 1m
                      </Button>
                    </Grid2>
                    <Grid2 item>
                      <Button
                        onClick={handleClickBtn12M}
                        sx={{
                          color: selectBtn12M ? "red" : "black",
                          backgroundColor: selectBtn12M ? "#fef2f2" : "#f3f4f6",
                          border: selectBtn12M ? "1px solid red" : "GrayText",
                          borderRadius: 3,
                        }}
                        variant="outlined"
                      >
                        1m-2m
                      </Button>
                    </Grid2>
                  </Grid2>
                </AccordionDetails>
              </Accordion>
            </Box>
            <Box padding={2} width="300px">
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography sx={{ fontWeight: "bold" }}>Giá</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Slider
                    getAriaLabel={() => "price range"}
                    value={valueCable}
                    marks={marksCable}
                    step={100000}
                    min={0}
                    max={3000000}
                    onChange={handleChangeValueCable}
                    valueLabelDisplay="auto"
                    valueLabelFormat={valuetext}
                    getAriaValueText={valuetext}
                    sx={{ color: "red" }}
                  />
                </AccordionDetails>
              </Accordion>
            </Box>
            <Box padding={2} width="100px">
              <Button
                variant="contained"
                color="primary"
                onClick={() =>
                  handleButtonCableFilter(
                    cableTypeList.join(","),
                    lengthList.join(","),
                    valueCable[0],
                    valueCable[1]
                  )
                }
              >
                Tìm kiếm
              </Button>
            </Box>
          </Box>
        )}
        {selectPower && (
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Box padding={2} width="180px">
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography sx={{ fontWeight: "bold", fontSize: 13 }}>
                    Dung lượng pin
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid2 container spacing={2}>
                    <Grid2 item>
                      <Button
                        onClick={handleClickBtnLess1000}
                        sx={{
                          color: selectedBtnLess1000 ? "red" : "black",
                          backgroundColor: selectedBtnLess1000
                            ? "#fef2f2"
                            : "#f3f4f6",
                          border: selectedBtnLess1000
                            ? "1px solid red"
                            : "GrayText",
                          borderRadius: 3,
                        }}
                        variant="outlined"
                      >
                        dưới 10.000 mah
                      </Button>
                    </Grid2>
                    <Grid2 item>
                      <Button
                        onClick={handleClickBtn1000}
                        sx={{
                          color: selectedBtn1000 ? "red" : "black",
                          backgroundColor: selectedBtn1000
                            ? "#fef2f2"
                            : "#f3f4f6",
                          border: selectedBtn1000
                            ? "1px solid red"
                            : "GrayText",
                          borderRadius: 3,
                        }}
                        variant="outlined"
                      >
                        10.000 mah
                      </Button>
                    </Grid2>
                    <Grid2 item>
                      <Button
                        onClick={handleClickBtn2000}
                        sx={{
                          color: selectedBtn2000 ? "red" : "black",
                          backgroundColor: selectedBtn2000
                            ? "#fef2f2"
                            : "#f3f4f6",
                          border: selectedBtn2000
                            ? "1px solid red"
                            : "GrayText",
                          borderRadius: 3,
                        }}
                        variant="outlined"
                      >
                        20.000 mah
                      </Button>
                    </Grid2>
                  </Grid2>
                </AccordionDetails>
              </Accordion>
            </Box>
            <Box padding={2} width="140px">
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography sx={{ fontWeight: "bold", fontSize: 13 }}>
                    Cổng vào
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid2 container spacing={2}>
                    <Grid2 item>
                      <Button
                        onClick={handleClickBtnWireless}
                        sx={{
                          color: selectedBtnWireless ? "red" : "black",
                          backgroundColor: selectedBtnWireless
                            ? "#fef2f2"
                            : "#f3f4f6",
                          border: selectedBtnWireless
                            ? "1px solid red"
                            : "GrayText",
                          borderRadius: 3,
                        }}
                        variant="outlined"
                      >
                        wireless
                      </Button>
                    </Grid2>
                    <Grid2 item>
                      <Button
                        onClick={handleClickBtnMicroUSB}
                        sx={{
                          color: selectedBtnMicroUSB ? "red" : "black",
                          backgroundColor: selectedBtnMicroUSB
                            ? "#fef2f2"
                            : "#f3f4f6",
                          border: selectedBtnMicroUSB
                            ? "1px solid red"
                            : "GrayText",
                          borderRadius: 3,
                        }}
                        variant="outlined"
                      >
                        micro usb
                      </Button>
                    </Grid2>
                    <Grid2 item>
                      <Button
                        onClick={handleClickBtnUSBC}
                        sx={{
                          color: selectedBtnUSBC ? "red" : "black",
                          backgroundColor: selectedBtnUSBC
                            ? "#fef2f2"
                            : "#f3f4f6",
                          border: selectedBtnUSBC
                            ? "1px solid red"
                            : "GrayText",
                          borderRadius: 3,
                        }}
                        variant="outlined"
                      >
                        usb-c
                      </Button>
                    </Grid2>
                  </Grid2>
                </AccordionDetails>
              </Accordion>
            </Box>
            <Box padding={2} width="120px">
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography sx={{ fontWeight: "bold", fontSize: 13 }}>
                    Cổng ra
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid2 container spacing={2}>
                    <Grid2 item>
                      <Button
                        onClick={handleClickBtnWirelessOut}
                        sx={{
                          color: selectedBtnWirelessOut ? "red" : "black",
                          backgroundColor: selectedBtnWirelessOut
                            ? "#fef2f2"
                            : "#f3f4f6",
                          border: selectedBtnWirelessOut
                            ? "1px solid red"
                            : "GrayText",
                          borderRadius: 3,
                        }}
                        variant="outlined"
                      >
                        wireless
                      </Button>
                    </Grid2>
                    <Grid2 item>
                      <Button
                        onClick={handleClickBtnMicroUSBA}
                        sx={{
                          color: selectedBtnUSBA ? "red" : "black",
                          backgroundColor: selectedBtnUSBA
                            ? "#fef2f2"
                            : "#f3f4f6",
                          border: selectedBtnUSBA
                            ? "1px solid red"
                            : "GrayText",
                          borderRadius: 3,
                        }}
                        variant="outlined"
                      >
                        usb-a
                      </Button>
                    </Grid2>
                  </Grid2>
                </AccordionDetails>
              </Accordion>
            </Box>
            <Box padding={2} width="150px">
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography sx={{ fontWeight: "bold", fontSize: 13 }}>
                    Công suất sạc
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid2 container spacing={2}>
                    <Grid2 item>
                      <Button
                        onClick={handleClickBtnFast1030}
                        sx={{
                          color: selectedBtnFast1030W ? "red" : "black",
                          backgroundColor: selectedBtnFast1030W
                            ? "#fef2f2"
                            : "#f3f4f6",
                          border: selectedBtnFast1030W
                            ? "1px solid red"
                            : "GrayText",
                          borderRadius: 3,
                        }}
                        variant="outlined"
                      >
                        từ 10-30W
                      </Button>
                    </Grid2>
                    <Grid2 item>
                      <Button
                        onClick={handleClickBtnFast3160}
                        sx={{
                          color: selectedBtnFast3160W ? "red" : "black",
                          backgroundColor: selectedBtnFast3160W
                            ? "#fef2f2"
                            : "#f3f4f6",
                          border: selectedBtnFast3160W
                            ? "1px solid red"
                            : "GrayText",
                          borderRadius: 3,
                        }}
                        variant="outlined"
                      >
                        Từ 31-60W
                      </Button>
                    </Grid2>
                  </Grid2>
                </AccordionDetails>
              </Accordion>
            </Box>
            <Box padding={2} width="250px">
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography sx={{ fontWeight: "bold", fontSize: 13 }}>
                    Giá
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Slider
                    getAriaLabel={() => "price range"}
                    value={valuePower}
                    marks={marksPow}
                    step={100000}
                    min={0}
                    max={5000000}
                    onChange={handleChangeValuePower}
                    valueLabelDisplay="auto"
                    valueLabelFormat={valuetext}
                    getAriaValueText={valuetext}
                    sx={{ color: "red" }}
                  />
                </AccordionDetails>
              </Accordion>
            </Box>
            <Box padding={2} width="100px">
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  handleButtonPowerBankFilter(
                    inputList.join(","),
                    outputList.join(","),
                    capacityList.join(","),
                    capacityLessList.join(","),
                    batteryGreaterList.join(","),
                    batteryLessList.join(","),
                    valuePower[0],
                    valuePower[1]
                  );
                }}
              >
                Tìm kiếm
              </Button>
            </Box>
          </Box>
        )}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            flexDirection: "row",
            mt: 2,
            gap: "30px",
            ml: 3, // Add margin to separate from sidebar
          }}
        >
          {data.data &&
            data.data.map((item, index) => (
              <Item
                id={item.id}
                name={item.name}
                image={item.url}
                new_price={item.discountedPrice}
                old_price={item.salePrice}
                sale={item.percentDiscount}
                key={index}
              ></Item>
            ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Category;
