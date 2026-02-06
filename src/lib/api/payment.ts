import { springApi } from './client';
import { ENDPOINTS } from './config';
import { SubscriptionPlan, PaymentMethod } from '@/types';

// Payment Service (Spring Boot)
export const paymentService = {
    // Get subscription details
    async getSubscription() {
        return springApi.get(ENDPOINTS.PAYMENTS.SUBSCRIPTIONS);
    },

    // Subscribe to a plan
    async subscribe(plan: SubscriptionPlan, paymentMethod: PaymentMethod) {
        return springApi.post(ENDPOINTS.PAYMENTS.SUBSCRIBE, {
            plan,
            paymentMethod,
        });
    },

    // Cancel subscription
    async cancelSubscription() {
        return springApi.post(ENDPOINTS.PAYMENTS.CANCEL_SUBSCRIPTION);
    },

    // Purchase course
    async purchaseCourse(courseId: string, paymentMethod: PaymentMethod) {
        return springApi.post(ENDPOINTS.PAYMENTS.PURCHASE_COURSE, {
            courseId,
            paymentMethod,
        });
    },

    // Get payment methods
    async getPaymentMethods() {
        return springApi.get<PaymentMethod[]>(ENDPOINTS.PAYMENTS.PAYMENT_METHODS);
    },

    // Get transaction history
    async getTransactions(filters?: { startDate?: string; endDate?: string }) {
        const params = new URLSearchParams(filters as any);
        return springApi.get(ENDPOINTS.PAYMENTS.TRANSACTIONS + '?' + params.toString());
    },

    // Get invoices
    async getInvoices() {
        return springApi.get(ENDPOINTS.PAYMENTS.INVOICES);
    },

    // Process payment for community entry
    async payCommunityEntry(communityId: string, amount: number, paymentMethod: PaymentMethod) {
        return springApi.post('/payments/community-entry', {
            communityId,
            amount,
            paymentMethod,
        });
    },
};

export default paymentService;
