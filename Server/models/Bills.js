const billSchema = new mongoose.Schema({
  items: [{
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
    quantity: { type: Number, required: true },
  }],
  totalPrice: { type: Number, required: true }
});
