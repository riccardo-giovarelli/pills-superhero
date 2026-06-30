import { getTranslations } from "next-intl/server";
import { prisma } from "@/lib/prisma";
import { Container, Typography } from "@mui/material";
import DictionariesTabs from "@/components/dictionaries-components/DictionariesTabs/DictionariesTabs";

export default async function DictionariesPage() {
  const t = await getTranslations("Dictionaries");

  const [units, forms, molecules, manufacturers] = await Promise.all([
    prisma.unit.findMany({ orderBy: { name: "asc" } }),
    prisma.medicationForm.findMany({ orderBy: { name: "asc" } }),
    prisma.molecule.findMany({ orderBy: { name: "asc" } }),
    prisma.manufacturer.findMany({ orderBy: { name: "asc" } }),
  ]);

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" mb={3}>
        {t("title")}
      </Typography>

      <DictionariesTabs units={units} forms={forms} molecules={molecules} manufacturers={manufacturers} />
    </Container>
  );
}
