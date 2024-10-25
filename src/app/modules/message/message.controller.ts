import httpStatus from "http-status"
import catchAsync from "../../utils/catchAsync"
import sendResponse from "../../utils/sendResponse"
import { MessageServices } from "./message.service"

const createMessage = catchAsync(async (req, res) => {
    const message = req.body
    const result = await MessageServices.createMessageIntoDB(message)
    sendResponse(res,{
        statusCode: httpStatus.OK,
        success: true,
        message: "Message created successfully",
        data: result
    })
})



export const MessageControllers = {
    createMessage
}