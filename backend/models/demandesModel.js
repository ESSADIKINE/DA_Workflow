import mongoose from 'mongoose';

const demandesSchema = new mongoose.Schema(
  {
    AR_Ref: {
      type: String,
      required: true,
      trim: true,
    },
    AR_Design: {
      type: String,
      required: true,
      trim: true,
    },
    AR_Qty: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      validate: {
        validator: function (value) {
          if (!this.AR_Ref || !this.AR_Design || !this.AR_Qty) {
            return value != null && value.trim().length > 0;
          }
          return true;
        },
        message: 'Description is required if AR_Ref, AR_Design, and AR_Qty are not provided',
      },
    },
    Demande_statut: {
      type: String,
      enum: ['Demander', 'Traité', 'Refusé'],
      default: 'Demander',
    },
  },
  {
    timestamps: true,
  }
);

const Demande = mongoose.model('Demande', demandesSchema);

export default Demande;
