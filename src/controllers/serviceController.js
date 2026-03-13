import Service from "../models/serviceModel.js";

/*
-----------------------------------------
Create a new salon service
POST /api/services
-----------------------------------------
*/
export const createService = async (req, res, next) => {
  try {
    const { name, category, price, duration, description, isAvailable } =
      req.body;

    const existingService = await Service.findOne({ name });

    if (existingService) {
      const error = new Error("Service already exists");
      error.statusCode = 400;
      throw error;
    }

    const service = await Service.create({
      name,
      category,
      price,
      duration,
      description,
      isAvailable,
    });

    res.status(201).json({
      success: true,
      message: "Service created successfully",
      data: service,
    });
  } catch (error) {
    next(error);
  }
};

/*
-----------------------------------------
Get all salon services
GET /api/services
-----------------------------------------
*/
export const getAllServices = async (req, res, next) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: services.length,
      data: services,
    });
  } catch (error) {
    next(error);
  }
};

/*
-----------------------------------------
Get single service by ID
GET /api/services/:id
-----------------------------------------
*/
export const getServiceById = async (req, res, next) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      const error = new Error("Service not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      data: service,
    });
  } catch (error) {
    next(error);
  }
};

/*
-----------------------------------------
Update service by ID
PUT /api/services/:id
-----------------------------------------
*/
export const updateService = async (req, res, next) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      const error = new Error("Service not found");
      error.statusCode = 404;
      throw error;
    }

    const updatedService = await Service.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );

    res.status(200).json({
      success: true,
      message: "Service updated successfully",
      data: updatedService,
    });
  } catch (error) {
    next(error);
  }
};

/*
-----------------------------------------
Delete service by ID
DELETE /api/services/:id
-----------------------------------------
*/
export const deleteService = async (req, res, next) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      const error = new Error("Service not found");
      error.statusCode = 404;
      throw error;
    }

    await Service.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Service deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
