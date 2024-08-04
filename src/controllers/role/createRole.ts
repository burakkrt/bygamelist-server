import { Request, Response } from 'express'
import { body, validationResult } from 'express-validator'
import RoleModel from '../../models/roleModel'

const roleValidationRules = () => [
  body('name').notEmpty().withMessage('Name is required'),
  body('roles').notEmpty().withMessage('Roles is required'),
]

const createRole = async (req: Request, res: Response) => {
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
    const { name, roles } = req.body

    const uniqueRoles = [...new Set(roles)]
    if (uniqueRoles.length !== roles.length) {
      return res.status(400).json({
        success: false,
        message: 'Roles array contains duplicate values',
      })
    }

    const existing = await RoleModel.findOne({ name })
    if (existing) {
      return res.status(409).json({
        success: false,
        message: 'A role with this name already exists',
      })
    }

    const newRole = new RoleModel({
      name,
      roles,
    })

    const savedRole = await newRole.save()

    res.status(201).json({
      success: true,
      data: [savedRole],
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

export { createRole, roleValidationRules }
