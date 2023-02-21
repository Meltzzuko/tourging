import { TourRepository } from "./TourRepository";
import { PaymentRepository } from "./PaymentRepository";
import { ReviewRepository } from "./ReviewRepository";

const repositories = {
    Tourdata :new TourRepository(),
    Paymentdata :new PaymentRepository(),
    Reviewdata :new ReviewRepository()
}

export default repositories