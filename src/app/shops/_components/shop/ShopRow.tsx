"use client";

import { type Region, type Shop } from "@prisma/client";
import { type FC } from "react";
import { DeletModal } from "~/components/common/DeleteModal";
import { TableCell, TableRow } from "~/components/ui/table";
import { api } from "~/trpc/react";
import CreateShopForm from "./CreateShopForm";

interface ShopRowProps {
  shop: Shop & {
    region: Region;
  };
}

const ShopRow: FC<ShopRowProps> = ({ shop }) => {
  const utils = api.useUtils();

  const deleteShop = api.shops.update.useMutation({
    onSuccess: (data) => {
      if (data.success) {
        utils.shops.all.setData(undefined, (old) => {
          return old?.filter((sh) => sh.id !== shop.id);
        });
      }
    },
  });

  return (
    <TableRow key={shop.id}>
      <TableCell>{shop.name}</TableCell>
      <TableCell>{shop.region.name}</TableCell>
      <TableCell>{shop.address}</TableCell>
      <TableCell>
        <div className="flex items-center gap-4">
          <CreateShopForm shop={shop} />
          <DeletModal
            deleteFn={() =>
              deleteShop.mutate({
                id: shop.id,
                update: { status: false },
              })
            }
            name="Shop"
            loading={deleteShop.isPending}
          />
        </div>
      </TableCell>
    </TableRow>
  );
};

export default ShopRow;
