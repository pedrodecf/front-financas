"use client";

import AddButton from "@/components/add-button";
import { CategoriesChartDashboard } from "@/components/charts/categories-chart-dashboard";
import { ControllerDashboard } from "@/components/controller-dashboard";
import { categoriesColumns } from "@/components/tables/categorias/categories-columns";
import { CategoriesTable } from "@/components/tables/categorias/categories-table";
import { fecthCategories } from "@/components/tables/categories-moks";
import { fetchTransactions } from "@/components/tables/transactions-mock";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { DialogCategoryCreate } from "@/components/ui/dialog/dialog-category-create/dialog-transaction-create";
import {
  TCreateCategoryInput,
  TCreateCategoryOutput,
} from "@/components/ui/dialog/dialog-category-create/schema";
import { UseFormReturn } from "react-hook-form";

type TCategoriasView = {
  formMethods: UseFormReturn<
    TCreateCategoryInput,
    unknown,
    TCreateCategoryOutput
  >;
};

export default function CategoriasView({ formMethods }: TCategoriasView) {
  const categories = fecthCategories();
  const transactions = fetchTransactions();
  return (
    <>
      <ControllerDashboard userName={"user.nome"} />
      <div className="grid grid-cols-2 gap-6 w-full flex-1 h-full overflow-hidden tablet:flex tablet:flex-col tablet:overflow-auto tablet:gap-4">
        <div className="col-span-1">
          <CategoriesTable data={categories} columns={categoriesColumns} />
        </div>
        <div className="flex flex-col gap-6 w-full flex-1 h-full overflow-hidden tablet:flex tablet:flex-col tablet:overflow-auto tablet:gap-4">
          <Dialog>
            <DialogTrigger>
              <AddButton
                className="h-fit"
                title="Cadastrar nova categoria"
                description="Classifique transações de forma organizada"
                icon="Layers2"
              />
            </DialogTrigger>

            <DialogCategoryCreate
              formMethods={formMethods}
              onHandleSubmit={() => {
                console.log(formMethods.getValues());
              }}
              title="Adicionar categoria"
            />
          </Dialog>
          <CategoriesChartDashboard
            transacoes={transactions}
            className="col-span-1"
          />
        </div>
      </div>
    </>
  );
}
