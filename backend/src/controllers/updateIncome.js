const updateIncome = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount, date, type, description } = req.body;

    const income = await prisma.incomes.update({
      where: { id: parseInt(id) },
      data: {
        amount: parseFloat(amount),
        date: new Date(date),
        type: type || null,
        description: description || null,
      },
    });

    res.json(income);
  } catch (error) {
    console.error("Erreur update revenu:", error);
    res.status(500).json({ message: "Erreur serveur", details: error.message });
  }
};
