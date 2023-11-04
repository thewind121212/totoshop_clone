import { useEffect, useState } from "react";
import { CheckedBox, UnCheckBox } from "../UI/svg/customSVG.component";
import RangeSlider from "../UI/range-slider/RangeSlider.component";
import { useAppDispatch } from "@/redux/reduxHook";
import {
  changeFilterColorAttribute,
  changeFilterSizeAttribute,
  changeFilterSubCategory,
} from "@/redux/Features/Filter/filter.slice";
import { useAppSelector } from "@/redux/reduxHook";

// components speperate

const FormFilterContentChild = ({
  menuCategory,
  collectionId,
  filter,
}: {
  menuCategory: any;
  collectionId: (idArray: any, type: string) => void;
  filter: any;
}) => {
  const [checkStatus, setCheckStatus] = useState<any>({
    allChecked: false,
    checkedItems: [],
  });

  useEffect(() => {
    if (filter.filterActive) {
      const preRenderChecked: any = [];
      menuCategory.detailCategoryItems.map((item: any) => {
        if (filter.subCategory.includes(item.categoryDetailId))
          preRenderChecked.push(item.categoryDetailId);
      });

      const isAllChecked =
        preRenderChecked.length === menuCategory.detailCategoryItems.length;

      setCheckStatus({
        allChecked: isAllChecked,
        checkedItems: preRenderChecked,
      });
      return;
    }
    if (!filter.filterActive) {
      setCheckStatus({
        allChecked: false,
        checkedItems: [],
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter.filterActive]);

  //init

  //build checker
  const onCheckItem = (e: any) => {
    const { value } = e.target;
    let newCheckedItems: any = [].concat(checkStatus.checkedItems);
    const itemsInCategory = menuCategory.detailCategoryItems.length;

    //is have id to add or remove
    if (checkStatus.checkedItems.includes(value)) {
      newCheckedItems = newCheckedItems.filter((item: any) => item !== value);
      collectionId([value], "remove");
    } else {
      newCheckedItems.push(value);
      collectionId([value], "add");
    }

    if (newCheckedItems.length === itemsInCategory) {
      const newCheckStatus = {
        ...checkStatus,
        allChecked: true,
        checkedItems: newCheckedItems,
      };
      setCheckStatus(newCheckStatus);
    } else {
      setCheckStatus({
        ...checkStatus,
        allChecked: false,
        checkedItems: newCheckedItems,
      });
    }
  };

  const onCheckAll = (e: any) => {
    const newCheckState: any = {
      allChecked: !checkStatus.allChecked,
      checkedItems: [],
    };

    const listIdToRemoveOrAdd: any[] = [];
    menuCategory.detailCategoryItems.map((item: any) => {
      listIdToRemoveOrAdd.push(item.categoryDetailId);
    });

    if (newCheckState.allChecked) {
      collectionId(listIdToRemoveOrAdd, "add");
      setCheckStatus({ ...newCheckState, checkedItems: listIdToRemoveOrAdd });
      return;
    }

    collectionId(listIdToRemoveOrAdd, "remove");

    setCheckStatus(newCheckState);
  };

  return (
    <div className="w-full h-auto">
      <label className="flex justify-start items-center">
        <span className="flex items-center">
          <input
            type="checkbox"
            className="hidden"
            name=""
            value={menuCategory.subCategoryId}
            onClick={onCheckAll}
          />
          {checkStatus.allChecked ? <CheckedBox /> : <UnCheckBox />}
        </span>
        <span className="ml-[5px] cursor-pointer capitalize">
          {menuCategory.name}
        </span>
      </label>
      <div className="ml-[20px]">
        {menuCategory.detailCategoryItems.map((item: any, index: any) => {
          return (
            <label
              className="flex justify-start items-center"
              key={item.categoryDetailId}
            >
              <span className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="hidden"
                  name=""
                  value={item.categoryDetailId}
                  onClick={onCheckItem}
                />
                {checkStatus.checkedItems.includes(item.categoryDetailId) ? (
                  <CheckedBox />
                ) : (
                  <UnCheckBox />
                )}
              </span>
              <span className="ml-[5px] cursor-pointer">{item.name}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
};

const FormFilterContent = ({ menuCategory }: { menuCategory: any }) => {
  const dispath = useAppDispatch();
  const store = useAppSelector((state) => state.filterStatus);
  let cloneFullId = [...store.subCategory];

  const onCollectIdHander = (idArray: any, type: string) => {
    if (type === "add") {
      const newIdArray: any[] = [];

      idArray.map((item: any) => {
        if (!cloneFullId.includes(item)) {
          newIdArray.push(item);
        }
      });

      dispath(changeFilterSubCategory([...cloneFullId, ...newIdArray]));
    } else {
      idArray.map((item: any) => {
        if (cloneFullId.includes(item)) {
          cloneFullId = cloneFullId.filter((id: any) => id !== item);
        }
      });
      dispath(changeFilterSubCategory(cloneFullId));
    }
  };

  return (
    <div className="w-auto h-auto">
      {menuCategory.map((item: any, index: any) => {
        return (
          <FormFilterContentChild
            menuCategory={item}
            key={item.name}
            filter={store}
            collectionId={onCollectIdHander}
          />
        );
      })}
    </div>
  );
};

// components speperate
const ColorFilterContent = ({ attributeColor }: { attributeColor: any }) => {
  const dispatch = useAppDispatch();
  const store = useAppSelector((state) => state.filterStatus.colorAttribute);

  const toggleColorFilter = (colorCode: string) => {
    const cloneColorCheck = [...store];
    if (cloneColorCheck.includes(colorCode)) {
      const newColorCheck = cloneColorCheck.filter(
        (item: any) => item !== colorCode
      );
      dispatch(changeFilterColorAttribute(newColorCheck));
      return;
    }

    cloneColorCheck.push(colorCode);
    dispatch(changeFilterColorAttribute(cloneColorCheck));
    return;
  };

  return (
    <div className="flex gap-[16px] w-auto h-auto flex-wrap p-[16px]">
      {attributeColor.map((item: any) => {
        if (item.attribute_name === "none") return;
        return (
          <div
            className="w-[27px] h-[27px] rounded-[3px] flex justify-center items-center"
            key={item.attribute_value}
            onClick={() => toggleColorFilter(item.attribute_value)}
            style={{
              border: store.includes(item.attribute_value)
                ? "2px solid #00b156"
                : "2px solid #eeeeee",
            }}
          >
            <div
              className="w-[20px] h-[20px] rounded-[3px]"
              style={{ backgroundColor: `#${item.attribute_name}` }}
            ></div>
          </div>
        );
      })}
    </div>
  );
};

// components speperate
const SizeFilterContent = ({ attributeSize }: { attributeSize: any }) => {
  const dispath = useAppDispatch();
  const store = useAppSelector((state) => state.filterStatus.sizeAttribute);

  const placeHolderTextSize = ["S", "M", "L", "XL", "2XL", "3XL", "4XL", "FS"];

  placeHolderTextSize.map((item: any, index: any) => {
    return (placeHolderTextSize[index] = attributeSize["Kích Cỡ Chữ"].find(
      (size: any) => size.attribute_value === item
    ));
  });

  const placeHolderNumberSize = attributeSize["Kích Cỡ Số"].sort(
    (a: any, b: any) => {
      return Number(a.attribute_value) - Number(b.attribute_value);
    }
  );

  const addOrRemoveSize = (attribute_id: number) => {
    const cloneSize: any = [...store];
    if (cloneSize.includes(attribute_id)) {
      const newSize = cloneSize.filter((item: any) => item !== attribute_id);
      dispath(changeFilterSizeAttribute(newSize));
      return;
    }

    cloneSize.push(attribute_id);
    dispath(changeFilterSizeAttribute(cloneSize));
    return;
  };

  return (
    <div className="flex flex-col">
      <div className="w-full h-auto">
        <div className="">Kích cỡ áo</div>
        <div className="w-full h-auto flex flex-wrap">
          {placeHolderTextSize.map((item: any) => {
            return (
              <div
                className="w-[50%] flex gap-[4px]"
                key={item.id}
                onClick={() => addOrRemoveSize(item.id)}
              >
                {store.includes(item.id) ? <CheckedBox /> : <UnCheckBox />}
                <div className="">{item.attribute_value}</div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="w-full h-auto"></div>
      <div className="">Kích cỡ quần</div>
      <div className="w-full h-auto flex flex-wrap">
        {placeHolderNumberSize.map((item: any) => {
          return (
            <div
              className="w-[50%] flex gap-[4px]"
              key={item.id}
              onClick={() => addOrRemoveSize(item.id)}
            >
              {store.includes(item.id) ? <CheckedBox /> : <UnCheckBox />}
              <div className="">{item.attribute_value}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// components speperate
const PriceFilterContent = ({}: {}) => {
  return <RangeSlider />;
};

export {
  FormFilterContent,
  ColorFilterContent,
  SizeFilterContent,
  PriceFilterContent,
};
