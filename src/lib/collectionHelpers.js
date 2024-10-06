export function createDocumentForCollection(collectionName, data) {
    switch (collectionName) {
      case 'customers': {
        const { customerName, email, phone, address } = data;
        if (!customerName || !email || !phone) {
          throw new Error('Customer name, email, and phone are required');
        }
        return {
          customerName,
          email,
          phone,
          address,
          createdAt: new Date(),
        };
      }
  
      case 'groups': {
        const { groupName, members } = data;
        if (!groupName || !Array.isArray(members)) {
          throw new Error('Group name and members are required');
        }
        return {
          groupName,
          members,
          createdAt: new Date(),
        };
      }
  
      case 'institutes': {
        const { fullName, emailId, phoneNumber, instituteName } = data;
        if (!fullName || !emailId || !phoneNumber || !instituteName) {
          throw new Error('Full name, emailId, phone number, and institute name are required');
        }
        return {
          fullName,
          emailId,
          phoneNumber,
          instituteName,
          createdAt: new Date(),
        };
      }
  
      case 'notifications': {
        const { message, userId } = data;
        if (!message || !userId) {
          throw new Error('Message and userId are required');
        }
        return {
          message,
          userId,
          read: false,
          createdAt: new Date(),
        };
      }
  
      case 'subscriptions': {
        const { plan, userId, startDate, endDate } = data;
        if (!plan || !userId || !startDate || !endDate) {
          throw new Error('Plan, userId, startDate, and endDate are required');
        }
        return {
          plan,
          userId,
          startDate: new Date(startDate),
          endDate: new Date(endDate),
          createdAt: new Date(),
        };
      }
  
      case 'transactions': {
        const { amount, transactionDate, userId, status } = data;
        if (!amount || !transactionDate || !userId || !status) {
          throw new Error('Amount, transactionDate, userId, and status are required');
        }
        return {
          amount,
          transactionDate: new Date(transactionDate),
          userId,
          status,
          createdAt: new Date(),
        };
      }
  
      default:
        throw new Error('Invalid collection name');
    }
  }
  