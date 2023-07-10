export const multishopKeys = {
  shopTypeList: () => ['AYAZayMultiShop', 'GetShopTypeList'] as const,
  settingDetail: () => ['AYAZayMultiShop', 'GetSettingDetail'] as const,
  shopAddress: (shopId: number) =>
    ['AYAZayMultiShop', 'GetShopAddress', shopId] as const,
};
