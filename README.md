# -------------------------------------------------------------------------------

## 从数组中选出和等于固定值的n个数

### 启动

npm start

#### 调用说明

+ array: 数据源数组。必选。

+ sum: 相加的和。必选。

+ tolerance: 容差。如果不指定此参数，则相加的和必须等于sum参数，指定此参数可以使结果在容差范围内浮动。可选。

+ targetCount: 操作数数量。如果不指定此参数，则结果包含所有可能的情况，指定此参数可以筛选出固定数量的数相加，假如指定为3，那么结果只包含三个数相加的情况。可选。

+ 返回值：返回的是嵌套数组结构，内层数组中的元素是操作数，外层数组中的元素是所有可能的结果。
