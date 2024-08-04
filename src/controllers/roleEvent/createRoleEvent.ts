import { Request, Response } from 'express'
import { body, validationResult } from 'express-validator'
import RoleEventModel from '../../models/roleEventModel'

const roleEventValidationRules = () => [
  body('name').notEmpty().withMessage('Name is required'),
]

const createRoleEvent = async (req: Request, res: Response) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      error: {
        message: 'Validation error',
        details: errors.array(),
      },
    })
  }

  try {
    const { name, description } = req.body

    const existing = await RoleEventModel.findOne({ name })
    if (existing) {
      return res.status(409).json({
        success: false,
        message: 'A role with this name already exists',
      })
    }

    const newRoleEvent = new RoleEventModel({
      name,
      description,
    })

    const savedRoleEvent = await newRoleEvent.save()

    res.status(201).json({
      success: true,
      data: [savedRoleEvent],
    })
  } catch (error) {
    console.error('Error : ', error)

    res.status(500).json({
      success: false,
      error: {
        message: error instanceof Error ? error.message : 'An unknown error occurred',
      },
    })
  }
}

export { createRoleEvent, roleEventValidationRules }
